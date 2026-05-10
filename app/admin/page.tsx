'use client';

import { useState, useEffect } from 'react';
import { storageManager } from '../../lib/storage';
import { createNewGoal, calculateGoalProgress } from '../../lib/types';
import type { Goal, GoalFormData } from '../../lib/types';
import GoalForm from '../components/GoalForm';
import GoalList from '../components/GoalList';
import AuthGuard from '../components/AuthGuard';
import { useAlert } from '../components/Alert';

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="inline-block align-[-2px]">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

const AdminPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(true);
  const { showAlert, showConfirm } = useAlert();

  useEffect(() => {
    const savedGoals = storageManager.getGoals();
    setGoals(savedGoals);
    setLoading(false);
  }, []);

  const handleSaveGoal = (goalData: GoalFormData): void => {
    if (editingGoal) {
      const updatedGoalData = {
        ...goalData,
        subGoals: goalData.subGoals.map((subGoal, index) => ({
          ...subGoal,
          id:
            subGoal.id ??
            `${editingGoal.id}-sub-${index + 1}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          completedAt: subGoal.isCompleted ? new Date().toISOString() : null,
        })),
      };
      const updatedGoal = storageManager.updateGoal(editingGoal.id, updatedGoalData);
      if (updatedGoal) {
        setGoals((prev) => prev.map((g) => (g.id === editingGoal.id ? updatedGoal : g)));
      }
    } else {
      const newGoal = createNewGoal(goalData.title, goalData.description, goalData.subGoals.length);
      newGoal.subGoals = goalData.subGoals.map((subGoal, index) => ({
        id: subGoal.id ?? `${newGoal.id}-sub-${index + 1}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: subGoal.title,
        description: subGoal.description,
        isCompleted: subGoal.isCompleted,
        completedAt: subGoal.isCompleted ? new Date().toISOString() : null,
        dueDate: subGoal.dueDate || undefined,
      }));
      newGoal.currentSelfDescription = goalData.currentSelfDescription;
      newGoal.futureSelfDescription = goalData.futureSelfDescription;
      storageManager.addGoal(newGoal);
      setGoals((prev) => [...prev, newGoal]);
    }
    setShowForm(false);
    setEditingGoal(null);
  };

  const handleEditGoal = (goal: Goal): void => {
    setEditingGoal(goal);
    setShowForm(true);
  };

  const handleDeleteGoal = async (goalId: string): Promise<void> => {
    const confirmed = await showConfirm('確定要刪除這個目標嗎？', '刪除目標');
    if (confirmed) {
      storageManager.deleteGoal(goalId);
      setGoals((prev) => prev.filter((g) => g.id !== goalId));
      showAlert('目標已成功刪除', 'success');
    }
  };

  const handleToggleSubGoal = (goalId: string, subGoalId: string, isCompleted: boolean): void => {
    const updatedGoal = storageManager.updateSubGoal(goalId, subGoalId, { isCompleted });
    if (updatedGoal) {
      setGoals((prev) => prev.map((g) => (g.id === goalId ? updatedGoal : g)));
    }
  };

  const handleCancel = (): void => {
    setShowForm(false);
    setEditingGoal(null);
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

  const inProgressCount = goals.filter((g) => { const p = calculateGoalProgress(g); return p > 0 && p < 100; }).length;
  const completedCount = goals.filter((g) => calculateGoalProgress(g) === 100).length;
  const totalSubGoals = goals.reduce((sum, g) => sum + g.subGoals.length, 0);

  return (
    <AuthGuard>
      <div className="max-w-container mx-auto px-6 pb-20">
        {/* Page header */}
        <div className="pt-10 pb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4 md:gap-6">
          <div>
            <p className="eyebrow">後台管理</p>
            <h1 className="font-serif text-[36px] md:text-[40px] font-medium tracking-[-0.02em] mt-2 mb-1.5">目標管理後台</h1>
            <p className="text-ink-2 m-0 text-[15px]">新增與管理你的個人成長目標。</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="btn-d btn-primary-d self-start md:self-auto shrink-0"
          >
            <PlusIcon /> 新增目標
          </button>
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-line rounded-dl bg-surface overflow-hidden">
          {[
            { label: 'All goals', value: goals.length },
            { label: 'In progress', value: inProgressCount },
            { label: 'Achieved', value: completedCount, positive: true },
            { label: 'Subgoals', value: totalSubGoals },
          ].map((s, i) => (
            <div key={i} className="p-6 border-l border-line first:border-l-0 [&:nth-child(odd)]:border-l-0 md:[&:nth-child(odd)]:border-l md:[&:nth-child(1)]:border-l-0">
              <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-3">{s.label}</div>
              <div className={`font-serif text-[36px] font-medium leading-none mt-3 tracking-[-0.02em] ${s.positive ? 'text-positive' : 'text-ink'}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Goal form */}
        {showForm && (
          <div className="mt-6">
            <GoalForm goal={editingGoal} onSave={handleSaveGoal} onCancel={handleCancel} />
          </div>
        )}

        {/* Goal list */}
        <div className="bg-surface border border-line rounded-dl shadow-ds mt-6 p-0">
          <div className="px-6 py-4 border-b border-line">
            <p className="eyebrow">目標列表</p>
          </div>
          <GoalList
            goals={goals}
            onEdit={handleEditGoal}
            onDelete={(id) => void handleDeleteGoal(id)}
            onToggleSubGoal={handleToggleSubGoal}
          />
        </div>
      </div>
    </AuthGuard>
  );
};

export default AdminPage;
