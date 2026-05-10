'use client';

import { useState, useEffect } from 'react';
import { useAlert } from './Alert';
import type { Goal, GoalFormData, SubGoalFormData, GoalFrequency } from '../../lib/types';

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="inline-block align-[-2px]">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

const MinusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="inline-block align-[-2px]">
    <path d="M5 12h14"/>
  </svg>
);

interface GoalFormProps {
  goal: Goal | null;
  onSave: (data: GoalFormData) => void;
  onCancel: () => void;
}

const FREQUENCIES: { value: GoalFrequency; label: string; desc: string }[] = [
  { value: 'daily', label: '每日', desc: '每天打卡一次' },
  { value: 'weekly', label: '每週', desc: '每週打卡一次' },
  { value: 'monthly', label: '每月', desc: '每月打卡一次' },
];

const getTodayDate = (): string => new Date().toISOString().split('T')[0];

const getDaysUntilDue = (dueDate: string): number | null => {
  if (!dueDate) return null;
  const today = new Date();
  const due = new Date(dueDate);
  return Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

const GoalForm = ({ goal, onSave, onCancel }: GoalFormProps) => {
  const { showAlert } = useAlert();
  const [formData, setFormData] = useState<GoalFormData>({
    title: '',
    description: '',
    currentSelfDescription: '',
    futureSelfDescription: '',
    frequency: 'daily',
    startDate: getTodayDate(),
    endDate: '',
    subGoals: [{
      title: '子目標 1',
      description: '',
      isCompleted: false,
      dueDate: '',
      tempId: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }],
  });

  useEffect(() => {
    if (goal) {
      setFormData({
        title: goal.title,
        description: goal.description,
        currentSelfDescription: goal.currentSelfDescription ?? '',
        futureSelfDescription: goal.futureSelfDescription ?? '',
        frequency: goal.frequency ?? 'daily',
        startDate: goal.startDate ?? getTodayDate(),
        endDate: goal.endDate ?? '',
        subGoals: goal.subGoals.map((sg): SubGoalFormData => ({
          title: sg.title,
          description: sg.description,
          isCompleted: sg.isCompleted,
          dueDate: sg.dueDate ?? '',
          id: sg.id,
          tempId: sg.tempId,
        })),
      });
    }
  }, [goal]);

  const set = <K extends keyof Omit<GoalFormData, 'subGoals' | 'subGoalCount'>>(
    field: K, value: GoalFormData[K]
  ) => setFormData((prev) => ({ ...prev, [field]: value }));

  const setSubGoal = (index: number, field: keyof SubGoalFormData, value: string | boolean) =>
    setFormData((prev) => ({
      ...prev,
      subGoals: prev.subGoals.map((sg, i) => i === index ? { ...sg, [field]: value } : sg),
    }));

  const addSubGoal = () =>
    setFormData((prev) => ({
      ...prev,
      subGoals: [...prev.subGoals, {
        title: `子目標 ${prev.subGoals.length + 1}`,
        description: '',
        isCompleted: false,
        dueDate: '',
        tempId: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      }],
    }));

  const removeSubGoal = (index: number) => {
    if (formData.subGoals.length > 1) {
      setFormData((prev) => ({ ...prev, subGoals: prev.subGoals.filter((_, i) => i !== index) }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.title.trim()) { showAlert('請輸入目標標題', 'warning'); return; }
    if (formData.subGoals.some((sg) => !sg.title.trim())) { showAlert('請確保所有子目標都有標題', 'warning'); return; }
    onSave({ ...formData, subGoalCount: formData.subGoals.length });
  };

  const inputClass = 'w-full px-3 py-2.5 border border-line rounded-d bg-bg text-ink text-[14px] placeholder:text-ink-4 focus:outline-none focus:border-accent transition-colors';
  const labelClass = 'block font-mono text-[11px] tracking-[0.1em] uppercase text-ink-3 mb-2';

  return (
    <div className="bg-surface border border-line rounded-dl shadow-ds">
      <div className="px-6 py-4 border-b border-line">
        <p className="eyebrow">{goal ? '編輯目標' : '新增目標'}</p>
        <h3 className="font-serif text-[20px] font-medium mt-1 tracking-[-0.01em]">
          {goal ? `編輯：${goal.title}` : '建立新目標'}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Basic info */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className={labelClass}>目標標題 *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => set('title', e.target.value)}
              className={inputClass}
              placeholder="輸入你的目標標題"
              required
            />
          </div>
          <div>
            <label className={labelClass}>目標描述</label>
            <textarea
              value={formData.description}
              onChange={(e) => set('description', e.target.value)}
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder="描述這個目標的詳細內容"
            />
          </div>
        </div>

        {/* Frequency + start date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>打卡頻率</label>
            <div className="flex gap-2">
              {FREQUENCIES.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => set('frequency', f.value)}
                  title={f.desc}
                  className={`flex-1 py-2 px-3 rounded-d border text-[13px] font-medium transition-all ${
                    formData.frequency === f.value
                      ? 'bg-accent text-accent-ink border-transparent'
                      : 'bg-bg border-line text-ink-2 hover:border-line-2 hover:text-ink'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-[12px] text-ink-4">
              {FREQUENCIES.find((f) => f.value === formData.frequency)?.desc}
            </p>
          </div>
          <div>
            <label className={labelClass}>起始日期</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => set('startDate', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>結束日期（選填）</label>
            <input
              type="date"
              value={formData.endDate ?? ''}
              onChange={(e) => set('endDate', e.target.value)}
              min={formData.startDate}
              className={inputClass}
            />
            <p className="mt-1.5 text-[12px] text-ink-4">設定後系統將計算打卡率</p>
          </div>
        </div>

        {/* Current / Future self */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>目前的自己（0%）</label>
            <textarea
              value={formData.currentSelfDescription}
              onChange={(e) => set('currentSelfDescription', e.target.value)}
              rows={4}
              className={`${inputClass} resize-none`}
              placeholder="描述你目前的狀態，作為起點"
            />
          </div>
          <div>
            <label className={labelClass}>未來的自己（100%）</label>
            <textarea
              value={formData.futureSelfDescription}
              onChange={(e) => set('futureSelfDescription', e.target.value)}
              rows={4}
              className={`${inputClass} resize-none`}
              placeholder="描述你理想中的狀態，作為目標"
            />
          </div>
        </div>

        {/* Sub goals */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className={labelClass + ' mb-0'}>子目標列表 *</label>
            <button
              type="button"
              onClick={addSubGoal}
              className="btn-d btn-secondary-d text-[12px] py-1.5"
            >
              <PlusIcon /> 新增子目標
            </button>
          </div>

          <div className="space-y-3">
            {formData.subGoals.map((subGoal, index) => (
              <div
                key={subGoal.id ?? subGoal.tempId ?? `subgoal-${index}`}
                className="border border-line rounded-d p-4 bg-bg"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-3">
                    子目標 {index + 1}
                  </span>
                  {formData.subGoals.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSubGoal(index)}
                      className="w-6 h-6 grid place-items-center rounded-ds text-ink-3 hover:text-warn hover:bg-warn-bg transition-colors"
                    >
                      <MinusIcon />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <input
                    type="text"
                    value={subGoal.title}
                    onChange={(e) => setSubGoal(index, 'title', e.target.value)}
                    className={inputClass}
                    placeholder="子目標標題"
                    required
                  />
                  <textarea
                    value={subGoal.description}
                    onChange={(e) => setSubGoal(index, 'description', e.target.value)}
                    rows={2}
                    className={`${inputClass} resize-none`}
                    placeholder="子目標描述（選填）"
                  />
                  <div>
                    <label className="block font-mono text-[11px] tracking-[0.1em] uppercase text-ink-3 mb-1.5">
                      到期日
                    </label>
                    <input
                      type="date"
                      value={subGoal.dueDate}
                      onChange={(e) => setSubGoal(index, 'dueDate', e.target.value)}
                      min={getTodayDate()}
                      className={inputClass}
                    />
                    {subGoal.dueDate && (() => {
                      const days = getDaysUntilDue(subGoal.dueDate);
                      if (days === null) return null;
                      return (
                        <p className={`mt-1 text-[12px] ${days < 0 ? 'text-warn' : 'text-ink-3'}`}>
                          {days > 0 ? `還有 ${days} 天` : days === 0 ? '今天到期' : `已過期 ${Math.abs(days)} 天`}
                        </p>
                      );
                    })()}
                  </div>
                  {goal && (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={subGoal.isCompleted}
                        onChange={(e) => setSubGoal(index, 'isCompleted', e.target.checked)}
                        className="w-4 h-4 rounded border-line accent-accent"
                      />
                      <span className="text-[13px] text-ink-2">已完成</span>
                    </label>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-accent-bg border border-line rounded-d">
            <p className="text-[13px] text-ink-2 m-0">
              完成 1 個子目標 = 縮短{' '}
              <span className="font-medium text-accent">
                {Math.round((1 / formData.subGoals.length) * 100)}%
              </span>{' '}
              與未來自己的差距
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-line">
          <button type="button" onClick={onCancel} className="btn-d btn-secondary-d">
            取消
          </button>
          <button type="submit" className="btn-d btn-primary-d">
            {goal ? '更新目標' : '建立目標'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GoalForm;
