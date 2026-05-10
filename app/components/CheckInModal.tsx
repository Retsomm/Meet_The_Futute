'use client';

import { useState } from 'react';
import type { Goal } from '../../lib/types';
import { getTodayString, hasCheckedInToday } from '../../lib/types';

interface CheckInModalProps {
  goal: Goal;
  onCheckIn: (goalId: string, date: string, note: string) => void;
  onClose: () => void;
}

const CheckInModal = ({ goal, onCheckIn, onClose }: CheckInModalProps) => {
  const today = getTodayString();
  const alreadyToday = hasCheckedInToday(goal);

  const [date, setDate] = useState(today);
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const existingOnDate = goal.checkIns.find((c) => c.date === date);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (existingOnDate) return;
    setSubmitting(true);
    onCheckIn(goal.id, date, note);
    setSubmitting(false);
    onClose();
  };

  const frequencyLabel: Record<string, string> = {
    daily: '每日',
    weekly: '每週',
    monthly: '每月',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-surface border border-line rounded-dl shadow-dm w-full max-w-[440px]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-line flex justify-between items-start gap-4">
          <div>
            <p className="eyebrow">打卡記錄</p>
            <h3 className="font-serif text-[18px] font-medium mt-1 tracking-[-0.01em] leading-snug">
              {goal.title}
            </h3>
            <span className="font-mono text-[11px] tracking-[0.08em] text-ink-3 mt-0.5 inline-block">
              {frequencyLabel[goal.frequency]} · 起始 {goal.startDate}
            </span>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 grid place-items-center rounded-d hover:bg-bg-2 text-ink-3 hover:text-ink transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Today badge */}
        {alreadyToday && (
          <div className="mx-6 mt-4 px-3 py-2 bg-positive-bg border border-line rounded-d flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-positive inline-block" />
            <span className="text-[13px] text-positive font-medium">今天已打卡</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Date */}
          <div>
            <label className="block font-mono text-[11px] tracking-[0.1em] uppercase text-ink-3 mb-2">
              日期
            </label>
            <input
              type="date"
              value={date}
              max={today}
              min={goal.startDate}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-line rounded-d bg-bg text-ink text-[14px] focus:outline-none focus:border-accent transition-colors"
            />
            {existingOnDate && date !== today && (
              <p className="mt-1.5 text-[12px] text-warn">此日期已有打卡紀錄</p>
            )}
            {existingOnDate && date === today && (
              <p className="mt-1.5 text-[12px] text-positive">今天已完成打卡</p>
            )}
          </div>

          {/* Note */}
          <div>
            <label className="block font-mono text-[11px] tracking-[0.1em] uppercase text-ink-3 mb-2">
              當日行動心得 <span className="normal-case tracking-normal text-ink-4">（選填）</span>
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              disabled={!!existingOnDate}
              placeholder={existingOnDate ? existingOnDate.note || '（無備註）' : '記下今天做了什麼、有什麼感受…'}
              className="w-full px-3 py-2.5 border border-line rounded-d bg-bg text-ink text-[14px] leading-[1.6] placeholder:text-ink-4 focus:outline-none focus:border-accent transition-colors resize-none disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-d btn-secondary-d flex-1 justify-center"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={!!existingOnDate || submitting}
              className="btn-d btn-primary-d flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {existingOnDate ? '已打卡' : '✓ 完成打卡'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckInModal;
