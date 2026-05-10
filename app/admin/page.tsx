'use client';

import { useState, useEffect } from 'react';
import { storageManager } from '../../lib/storage';
import { createNewGoal, calculateGoalProgress } from '../../lib/types';
import type { Goal, GoalFormData } from '../../lib/types';
import GoalForm from '../components/GoalForm';
import GoalList from '../components/GoalList';
import AuthGuard from '../components/AuthGuard';
import { useAlert } from '../components/Alert';
import { FiPlus, FiTarget, FiEdit, FiTrash2 } from 'react-icons/fi';

export default function AdminPage() {
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

      const updatedGoal = storageManager.updateGoal(
        editingGoal.id,
        updatedGoalData
      );
      if (updatedGoal) {
        setGoals((prev) =>
          prev.map((g) => (g.id === editingGoal.id ? updatedGoal : g))
        );
      }
    } else {
      const newGoal = createNewGoal(
        goalData.title,
        goalData.description,
        goalData.subGoals.length
      );

      newGoal.subGoals = goalData.subGoals.map((subGoal, index) => ({
        id:
          subGoal.id ??
          `${newGoal.id}-sub-${index + 1}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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

  const handleToggleSubGoal = (
    goalId: string,
    subGoalId: string,
    isCompleted: boolean
  ): void => {
    const updatedGoal = storageManager.updateSubGoal(goalId, subGoalId, {
      isCompleted,
    });
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600 dark:text-gray-300 transition-colors">
            載入中...
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">
                  目標管理後台
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300 transition-colors">
                  創建和管理你的個人成長目標
                </p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
              >
                <FiPlus className="mr-2 h-4 w-4" />
                新增目標
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
              <div className="flex items-center">
                <FiTarget className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    總目標數
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {goals.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
              <div className="flex items-center">
                <FiEdit className="h-8 w-8 text-green-600 dark:text-green-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    進行中
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {
                      goals.filter((g) => {
                        const p = calculateGoalProgress(g);
                        return p > 0 && p < 100;
                      }).length
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
              <div className="flex items-center">
                <FiTarget className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    已完成
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {goals.filter((g) => calculateGoalProgress(g) === 100).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
              <div className="flex items-center">
                <FiTrash2 className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    總子目標
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {goals.reduce((sum, g) => sum + g.subGoals.length, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {showForm && (
            <div className="mb-8">
              <GoalForm
                goal={editingGoal}
                onSave={handleSaveGoal}
                onCancel={handleCancel}
              />
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                目標列表
              </h2>
            </div>
            <GoalList
              goals={goals}
              onEdit={handleEditGoal}
              onDelete={(id) => void handleDeleteGoal(id)}
              onToggleSubGoal={handleToggleSubGoal}
            />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
