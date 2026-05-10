'use client';

import type { Goal } from '../../lib/types';
import { calculateCheckInRate } from '../../lib/types';

interface PersonalComparisonProps {
  goals: Goal[];
  overallProgress: number;
}

const getMotivationalMessage = (progress: number): string => {
  if (progress >= 90) return '你已經非常接近理想的自己了，繼續保持。';
  if (progress >= 70) return '穩步邁向目標，做得很好。';
  if (progress >= 50) return '已經走了一半，持續往前。';
  if (progress >= 30) return '良好的開始，一步一腳印地前進。';
  if (progress >= 10) return '每一步都算數，堅持下去。';
  return '行動本身就是最大的成功。';
};

export default function PersonalComparison({ goals, overallProgress }: PersonalComparisonProps) {
  if (!goals || goals.length === 0) return null;

  const totalSubGoals = goals.reduce((sum, g) => sum + g.subGoals.length, 0);
  const completedSubGoals = goals.reduce(
    (sum, g) => sum + g.subGoals.filter((sg) => sg.isCompleted).length,
    0
  );
  const inProgressGoals = goals.filter((g) => {
    const p = totalSubGoals > 0
      ? Math.round((g.subGoals.filter((sg) => sg.isCompleted).length / g.subGoals.length) * 100)
      : 0;
    return p > 0 && p < 100;
  }).length;
  const pendingSubGoals = totalSubGoals - completedSubGoals;
  const subGoalRate = totalSubGoals > 0
    ? ((completedSubGoals / totalSubGoals) * 100).toFixed(1)
    : '0.0';
  const gapPercentage = 100 - overallProgress;

  return (
    <div className="bg-surface border border-line rounded-dl shadow-ds p-6">
      <div className="mb-6">
        <p className="eyebrow">對比</p>
        <h3 className="font-serif text-[20px] font-medium mt-1.5 mb-0 tracking-[-0.01em]">個人成長對比</h3>
      </div>

      {/* Present vs Future */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Present self */}
        <div className="p-5 border border-line rounded-dl bg-bg-2">
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-3 mb-3">目前的自己</div>
          <div className="flex items-end gap-3 mb-4">
            <div className="font-serif text-[42px] font-medium leading-none tracking-[-0.02em] text-ink">
              {overallProgress}%
            </div>
            <div className="text-[13px] text-ink-3 pb-1">整體進度</div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[13px]">
              <span className="text-ink-3">已完成子目標</span>
              <span className="text-ink font-medium">{completedSubGoals} / {totalSubGoals}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-ink-3">進行中目標</span>
              <span className="text-ink font-medium">{inProgressGoals} 個</span>
            </div>
          </div>
        </div>

        {/* Future self */}
        <div className="p-5 border border-line rounded-dl bg-bg-2">
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-3 mb-3">未來的自己</div>
          <div className="flex items-end gap-3 mb-4">
            <div className="font-serif text-[42px] font-medium leading-none tracking-[-0.02em] text-positive">
              100%
            </div>
            <div className="text-[13px] text-ink-3 pb-1">目標進度</div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[13px]">
              <span className="text-ink-3">全部子目標</span>
              <span className="text-ink font-medium">{totalSubGoals} 個</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-ink-3">待完成任務</span>
              <span className="text-ink font-medium">{pendingSubGoals} 個</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gap visualization */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-mono text-[11px] tracking-[0.08em] text-ink-3">目前的自己</span>
          <span className="font-mono text-[11px] tracking-[0.08em] text-ink-3">未來的自己</span>
        </div>
        <div className="h-2 bg-bg-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-700"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="font-mono text-[11px] text-ink-3">{overallProgress}% 已完成</span>
          <span className="font-mono text-[11px] text-accent">還差 {gapPercentage}%</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 border border-line rounded-dl overflow-hidden">
        {[
          { label: '子目標完成率', value: `${subGoalRate}%`, positive: Number(subGoalRate) >= 50 },
          { label: '進行中目標', value: `${inProgressGoals}`, positive: false },
          { label: '待完成任務', value: `${pendingSubGoals}`, positive: false },
        ].map((s, i) => (
          <div key={i} className="p-4 text-center border-l border-line first:border-l-0 bg-surface">
            <div className={`font-serif text-[28px] font-medium leading-none tracking-[-0.02em] ${s.positive ? 'text-positive' : 'text-ink'}`}>
              {s.value}
            </div>
            <div className="font-mono text-[10.5px] tracking-[0.08em] text-ink-3 mt-2 uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Motivational message */}
      <div className="mt-4 p-4 border border-line rounded-d bg-bg-2">
        <div className="flex items-start gap-3">
          <div className="w-1 h-full bg-accent rounded-full shrink-0 self-stretch min-h-[36px]" />
          <p className="text-[14px] text-ink-2 leading-[1.6] m-0 font-serif italic">
            {getMotivationalMessage(overallProgress)}
          </p>
        </div>
      </div>

      {/* Per-goal check-in rates */}
      {goals.some(g => g.endDate) && (
        <div className="mt-4 space-y-2">
          <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-3">打卡率</p>
          {goals.filter(g => g.endDate).map(goal => {
            const { rate, checkedDays, totalDays } = calculateCheckInRate(goal);
            return (
              <div key={goal.id} className="flex items-center gap-3">
                <span className="text-[13px] text-ink-2 truncate flex-1">{goal.title}</span>
                <div className="w-24 h-1.5 bg-bg-3 rounded-full overflow-hidden shrink-0">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${rate}%` }} />
                </div>
                <span className="font-mono text-[11px] text-ink-3 shrink-0 w-28 text-right">
                  {checkedDays}/{totalDays} 天 · {rate}%
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
