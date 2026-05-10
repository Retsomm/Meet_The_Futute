'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../components/SupabaseProvider';
import { storageManager } from '../../lib/storage';
import { supabaseStorage } from '../../lib/supabaseStorage';
import { hasCheckedInToday, getTodayString, calculateCheckInRate } from '../../lib/types';
import type { Goal } from '../../lib/types';
import AuthGuard from '../components/AuthGuard';
import { useAlert } from '../components/Alert';

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

const EditIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-[-2px]">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const frequencyLabel: Record<string, string> = {
  daily: '每日打卡',
  weekly: '每週打卡',
  monthly: '每月打卡',
};

const CheckInPage = () => {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const { showAlert } = useAlert();
  const tabsRef = useRef<HTMLDivElement>(null);

  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const today = getTodayString();
  const todayLabel = new Date().toLocaleDateString('zh-TW', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
  });

  useEffect(() => {
    const load = async () => {
      const data = userId
        ? await supabaseStorage.getGoals(userId)
        : storageManager.getGoals();
      const active = data.filter((g) => {
        if (g.startDate > today) return false;
        if (g.endDate && g.endDate < today) return false;
        return true;
      });
      setGoals(active);
      setLoading(false);
    };
    void load();
  }, [userId, today]);

  // Reset note/editMode when switching tabs
  useEffect(() => {
    const goal = goals[activeIdx];
    if (!goal) return;
    const existing = goal.checkIns.find((c) => c.date === today);
    setNote(existing?.note ?? '');
    setEditMode(false);
  }, [activeIdx, goals, today]);

  const activeGoal = goals[activeIdx] ?? null;
  const checkedIn = activeGoal ? hasCheckedInToday(activeGoal) : false;
  const existingCheckIn = activeGoal?.checkIns.find((c) => c.date === today);

  const handleSubmit = async () => {
    if (!activeGoal) return;
    setSubmitting(true);
    try {
      // If editing, delete the old check-in first
      if (editMode && existingCheckIn) {
        if (userId) {
          await supabaseStorage.deleteCheckIn(userId, activeGoal.id, existingCheckIn.id);
        } else {
          storageManager.deleteCheckIn(activeGoal.id, existingCheckIn.id);
        }
      }

      let updatedGoal: Goal | null = null;
      if (userId) {
        updatedGoal = await supabaseStorage.addCheckIn(userId, activeGoal.id, today, note);
      } else {
        updatedGoal = storageManager.addCheckIn(activeGoal.id, today, note);
      }

      if (updatedGoal) {
        setGoals((prev) => prev.map((g) => (g.id === activeGoal.id ? updatedGoal! : g)));
        setEditMode(false);
        showAlert(editMode ? '打卡記錄已更新' : '打卡成功！', 'success');
      }
    } finally {
      setSubmitting(false);
    }
  };

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
      <div className="max-w-[720px] mx-auto px-6 pb-20">
        {/* Header */}
        <div className="pt-10 pb-6">
          <p className="eyebrow">打卡</p>
          <h1 className="font-serif text-[40px] font-medium tracking-[-0.02em] mt-2 mb-1">今日打卡</h1>
          <p className="text-ink-2 text-[15px] m-0">{todayLabel}</p>
        </div>

        {goals.length === 0 ? (
          <div className="text-center py-20 border border-line rounded-dl bg-surface">
            <p className="text-ink-3 text-[15px]">目前沒有進行中的目標</p>
          </div>
        ) : (
          <>
            {/* Summary bar */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-3">今日待打卡目標</span>
              <span className="font-mono text-[11px] text-accent">
                {goals.filter((g) => !hasCheckedInToday(g)).length} / {goals.length} 未完成
              </span>
            </div>

            {/* Tabs — horizontal scroll */}
            <div
              ref={tabsRef}
              className="flex gap-2 overflow-x-auto pb-1 mb-6 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {goals.map((goal, idx) => {
                const done = hasCheckedInToday(goal);
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={goal.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-[13px] font-medium whitespace-nowrap transition-all shrink-0 ${
                      isActive
                        ? 'bg-ink text-bg border-transparent'
                        : 'bg-surface border-line text-ink-2 hover:border-line-2 hover:text-ink'
                    }`}
                  >
                    {done && (
                      <span className={`w-4 h-4 rounded-full grid place-items-center ${isActive ? 'bg-positive text-bg' : 'bg-positive-bg text-positive'}`}>
                        <CheckIcon />
                      </span>
                    )}
                    {!done && (
                      <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-accent' : 'bg-warn'}`} />
                    )}
                    {goal.title.length > 16 ? goal.title.slice(0, 16) + '…' : goal.title}
                  </button>
                );
              })}
            </div>

            {/* Active goal card */}
            {activeGoal && (
              <div className="bg-surface border border-line rounded-dl shadow-ds overflow-hidden">
                {/* Card header */}
                <div className="px-6 py-5 border-b border-line">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-[24px] font-medium tracking-[-0.01em] m-0">{activeGoal.title}</h2>
                      <div className="flex flex-wrap gap-3 font-mono text-[11px] tracking-[0.06em] text-ink-3 mt-2">
                        <span>{frequencyLabel[activeGoal.frequency ?? 'daily']}</span>
                        {activeGoal.endDate && <span>· 至 {activeGoal.endDate}</span>}
                        {activeGoal.endDate && (() => {
                          const { checkedDays, totalDays, rate } = calculateCheckInRate(activeGoal);
                          return <span>· 打卡率 {checkedDays}/{totalDays} 天 ({rate}%)</span>;
                        })()}
                      </div>
                    </div>
                    {checkedIn && !editMode && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-positive-bg border border-positive/20 text-positive font-mono text-[11px] tracking-[0.06em] shrink-0">
                        <CheckIcon /> 已打卡
                      </span>
                    )}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  {/* Not checked in — show form */}
                  {!checkedIn && (
                    <>
                      <label className="block font-mono text-[11px] tracking-[0.1em] uppercase text-ink-3 mb-3">
                        今天的行動心得（選填）
                      </label>
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={7}
                        autoFocus
                        className="w-full px-4 py-3 border border-line rounded-d bg-bg text-ink text-[15px] placeholder:text-ink-4 focus:outline-none focus:border-accent transition-colors resize-none leading-[1.75]"
                        placeholder="今天做了什麼？遇到什麼困難？有什麼收穫或想法……"
                      />
                      <button
                        onClick={() => void handleSubmit()}
                        disabled={submitting}
                        className={`btn-d btn-primary-d w-full flex justify-center mt-4${submitting ? ' opacity-60' : ''}`}
                      >
                        <CheckIcon />
                        {submitting ? '打卡中...' : '完成打卡'}
                      </button>
                    </>
                  )}

                  {/* Checked in — read mode */}
                  {checkedIn && !editMode && (
                    <>
                      <div className="mb-4">
                        <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-3 mb-3">今日心得</p>
                        {existingCheckIn?.note ? (
                          <p className="text-[15px] text-ink leading-[1.75] whitespace-pre-wrap">{existingCheckIn.note}</p>
                        ) : (
                          <p className="text-[14px] text-ink-4 font-mono">無心得記錄</p>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setNote(existingCheckIn?.note ?? '');
                          setEditMode(true);
                        }}
                        className="btn-d btn-secondary-d"
                      >
                        <EditIcon /> 編輯打卡
                      </button>
                    </>
                  )}

                  {/* Edit mode */}
                  {checkedIn && editMode && (
                    <>
                      <label className="block font-mono text-[11px] tracking-[0.1em] uppercase text-ink-3 mb-3">
                        修改今日心得
                      </label>
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={7}
                        autoFocus
                        className="w-full px-4 py-3 border border-accent rounded-d bg-bg text-ink text-[15px] placeholder:text-ink-4 focus:outline-none focus:border-accent transition-colors resize-none leading-[1.75]"
                        placeholder="修改你的打卡心得…"
                      />
                      <div className="flex gap-2.5 mt-4">
                        <button
                          onClick={() => void handleSubmit()}
                          disabled={submitting}
                          className={`btn-d btn-primary-d flex-1 flex justify-center${submitting ? ' opacity-60' : ''}`}
                        >
                          {submitting ? '儲存中...' : '儲存修改'}
                        </button>
                        <button
                          onClick={() => setEditMode(false)}
                          className="btn-d btn-secondary-d"
                        >
                          取消
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AuthGuard>
  );
};

export default CheckInPage;
