'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { storageManager } from '../../lib/storage';
import {
  calculateGoalProgress,
  calculateGapToFuture,
} from '../../lib/types';
import type { Goal } from '../../lib/types';
import { loadSampleData, sampleGoals } from '../../data/sampleData';
import GoalProgressChart from '../components/GoalProgressChart';
import PersonalComparison from '../components/PersonalComparison';
import AuthGuard from '../components/AuthGuard';
import { useAlert } from '../components/Alert';

const DashboardPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSample, setLoadingSample] = useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    const savedGoals = storageManager.getGoals();
    setGoals(savedGoals);
    setLoading(false);
  }, []);

  const handleLoadSampleData = async (): Promise<void> => {
    setLoadingSample(true);
    try {
      const existingGoals = storageManager.getGoals();
      await new Promise<void>((resolve) => setTimeout(resolve, 800));

      const hasSampleData = existingGoals.some((goal) =>
        sampleGoals.some((sample) => sample.title === goal.title)
      );
      if (hasSampleData) {
        showAlert('範例資料已存在，無需重複載入。', 'warning');
        return;
      }

      const newSampleGoals: Goal[] = sampleGoals.map((goal, index) => ({
        ...goal,
        id: `sample-${Date.now()}-${index}`,
        subGoals: goal.subGoals.map((subGoal, subIndex) => ({
          ...subGoal,
          id: `sub-${Date.now()}-${index}-${subIndex}`,
        })),
      }));

      const updatedGoals = [...existingGoals, ...newSampleGoals];
      storageManager.saveGoals(updatedGoals);
      setGoals(updatedGoals);

      const message =
        existingGoals.length > 0
          ? `範例資料已成功加入！新增了 ${newSampleGoals.length} 個範例目標到您現有的 ${existingGoals.length} 個目標中。`
          : '範例資料載入成功！現在您可以體驗完整的目標追蹤功能。';
      showAlert(message, 'success', 6000);
    } catch (error) {
      console.error('載入範例資料時發生錯誤:', error);
      showAlert('載入範例資料時發生錯誤，請稍後再試。', 'error');
    } finally {
      setLoadingSample(false);
    }
  };

  const overallProgress =
    goals.length > 0
      ? Math.round(goals.reduce((sum, g) => sum + calculateGoalProgress(g), 0) / goals.length)
      : 0;
  const completedGoals = goals.filter((g) => calculateGoalProgress(g) === 100).length;
  const totalSubGoals = goals.reduce((sum, g) => sum + g.subGoals.length, 0);
  const completedSubGoals = goals.reduce((sum, g) => sum + g.subGoals.filter((sg) => sg.isCompleted).length, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-line border-t-accent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-ink-3 font-mono text-[12px] tracking-[0.1em]">LOADING</p>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="max-w-container mx-auto px-6 pb-20">
        {/* Page header */}
        <div className="pt-10 pb-6">
          <p className="eyebrow">概覽</p>
          <h1 className="font-serif text-[40px] font-medium tracking-[-0.02em] mt-2 mb-1.5">目標追蹤儀表板</h1>
          <p className="text-ink-2 m-0 text-[15px]">量化你與未來自己的差距，見證每一步的成長進度。</p>
        </div>

        {goals.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-[16px] bg-bg-3 grid place-items-center mx-auto mb-8">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>
              </svg>
            </div>
            <h2 className="font-serif text-[28px] font-medium mb-3">還沒有設定任何目標</h2>
            <p className="text-ink-2 mb-8 text-[15px]">前往後台管理建立你的第一個目標，開始追蹤成長進度</p>
            <div className="flex justify-center gap-2.5 flex-wrap">
              <Link href="/admin" className="btn-d btn-primary-d btn-lg-d">建立第一個目標</Link>
              <button
                onClick={() => void handleLoadSampleData()}
                disabled={loadingSample}
                className={`btn-d btn-secondary-d btn-lg-d${loadingSample ? ' opacity-60' : ''}`}
              >
                {loadingSample ? '載入中...' : '加入範例資料'}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Stat row */}
            <div className="grid grid-cols-2 md:grid-cols-4 border border-line rounded-dl bg-surface overflow-hidden">
              {[
                { label: 'Total goals', value: goals.length, delta: null },
                { label: 'Completed', value: completedGoals, delta: `${Math.round(completedGoals / Math.max(goals.length, 1) * 100)}% rate` },
                { label: 'Progress', value: `${overallProgress}%`, delta: null },
                { label: 'Gap to future self', value: `${100 - overallProgress}%`, accent: true },
              ].map((s, i) => (
                <div key={i} className="p-6 border-l border-line first:border-l-0 [&:nth-child(odd)]:border-l-0 md:[&:nth-child(odd)]:border-l md:[&:nth-child(1)]:border-l-0">
                  <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-3">{s.label}</div>
                  <div className={`font-serif text-[36px] font-medium leading-none mt-3 tracking-[-0.02em] ${s.accent ? 'text-accent' : 'text-ink'}`}>{s.value}</div>
                  {s.delta && <div className="font-mono text-[11.5px] text-positive mt-2">{s.delta}</div>}
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="bg-surface border border-line rounded-dl shadow-ds p-6">
              <div className="mb-6">
                <p className="eyebrow">圖表</p>
                <h3 className="font-serif text-[20px] font-medium mt-1.5 mb-0 tracking-[-0.01em]">目標進度總覽</h3>
              </div>
              <GoalProgressChart goals={goals} />
            </div>

            {/* Personal comparison */}
            <PersonalComparison goals={goals} overallProgress={overallProgress} />

            {/* Detail */}
            <div>
              <div className="pb-2 mb-2">
                <p className="eyebrow">明細</p>
                <h2 className="font-serif text-[28px] font-medium mt-1.5 mb-0 tracking-[-0.02em]">詳細進度</h2>
              </div>
              <div className="bg-surface border border-line rounded-dl shadow-ds p-0">
                {goals.map((goal, idx) => {
                  const progress = calculateGoalProgress(goal);
                  const gap = calculateGapToFuture(goal);
                  const variant = progress === 100 ? 'green' : progress < 40 ? 'warn' : '';
                  const pctColor = variant === 'green' ? 'text-positive' : variant === 'warn' ? 'text-warn' : 'text-accent';
                  return (
                    <div key={goal.id} className={`p-6${idx === 0 ? '' : ' border-t border-line'}`}>
                      <div className="flex justify-between items-start gap-6">
                        <div>
                          <h3 className="font-serif text-[22px] font-medium tracking-[-0.01em] m-0">{goal.title}</h3>
                          <div className="flex gap-3.5 font-mono text-[11px] tracking-[0.06em] text-ink-3 mt-2">
                            <span>建立 · {new Date(goal.createdAt).toLocaleDateString('zh-TW')}</span>
                            <span>· {goal.subGoals.filter(sg => sg.isCompleted).length} / {goal.subGoals.length} 子目標</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className={`font-serif text-[32px] font-medium tracking-[-0.02em] ${pctColor}`}>{progress}%</div>
                        </div>
                      </div>
                      <div className={`progress-d${variant === 'green' ? ' progress-green-d' : variant === 'warn' ? ' progress-warn-d' : ''} mt-[18px]`}>
                        <span style={{ width: `${progress}%` }} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                        <div className="p-4 border border-line rounded-d bg-bg-2">
                          <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-3 mb-1.5">目前的自己</div>
                          <div className="text-[14px] text-ink-2 leading-[1.55]">{goal.currentSelfDescription || '尚未設定'}</div>
                        </div>
                        <div className="p-4 border border-line rounded-d bg-bg-2">
                          <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-3 mb-1.5">未來的自己</div>
                          <div className="text-[14px] text-ink-2 leading-[1.55]">{goal.futureSelfDescription || '尚未設定'}</div>
                        </div>
                      </div>
                      {gap > 0 && (
                        <div className="mt-4 p-[10px_14px] bg-warn-bg rounded-ds border border-line">
                          <p className="text-[13px] text-warn m-0">
                            <span className="font-medium">與未來自己還有 {gap}% 的差距</span>
                            {gap <= 25 && ' — 很接近目標了！'}
                            {gap > 25 && gap <= 50 && ' — 已經完成一半以上！'}
                            {gap > 50 && gap <= 75 && ' — 持續努力中'}
                            {gap > 75 && ' — 剛開始的路程'}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
};

export default DashboardPage;
