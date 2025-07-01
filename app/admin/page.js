'use client';

import { useState, useEffect } from 'react';
import { storageManager } from '../../lib/storage';
import { createNewGoal, calculateGoalProgress } from '../../lib/types';
import GoalForm from '../components/GoalForm';
import GoalList from '../components/GoalList';
import AuthGuard from '../components/AuthGuard';
import { useAlert } from '../components/Alert';
import { FiPlus, FiTarget, FiEdit, FiTrash2 } from 'react-icons/fi';

export default function AdminPage() {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showAlert, showConfirm } = useAlert();

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = () => {
    const savedGoals = storageManager.getGoals();
    setGoals(savedGoals);
    setLoading(false);
  };

  const handleSaveGoal = (goalData) => {
    if (editingGoal) {
      // 更新現有目標
      const updatedGoal = storageManager.updateGoal(editingGoal.id, goalData);
      if (updatedGoal) {
        setGoals(goals.map(g => g.id === editingGoal.id ? updatedGoal : g));
      }
    } else {
      // 創建新目標
      const newGoal = createNewGoal(
        goalData.title, 
        goalData.description, 
        goalData.subGoalCount
      );
      
      // 更新子目標資訊，確保每個子目標都有 id
      newGoal.subGoals = goalData.subGoals.map((subGoal, index) => ({
        ...subGoal,
        id: subGoal.id || Date.now().toString() + Math.random().toString(36).substr(2, 9) + index
      }));
      newGoal.currentSelfDescription = goalData.currentSelfDescription;
      newGoal.futureSelfDescription = goalData.futureSelfDescription;
      
      storageManager.addGoal(newGoal);
      setGoals([...goals, newGoal]);
    }
    
    setShowForm(false);
    setEditingGoal(null);
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setShowForm(true);
  };

  const handleDeleteGoal = async (goalId) => {
    const confirmed = await showConfirm('確定要刪除這個目標嗎？', '刪除目標');
    if (confirmed) {
      storageManager.deleteGoal(goalId);
      setGoals(goals.filter(g => g.id !== goalId));
      showAlert('目標已成功刪除', 'success');
    }
  };

  const handleToggleSubGoal = (goalId, subGoalId, isCompleted) => {
    const updatedGoal = storageManager.updateSubGoal(goalId, subGoalId, { isCompleted });
    if (updatedGoal) {
      setGoals(goals.map(g => g.id === goalId ? updatedGoal : g));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingGoal(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 頁面標題 */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">目標管理後台</h1>
              <p className="mt-2 text-gray-600">創建和管理你的個人成長目標</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="mr-2 h-4 w-4" />
              新增目標
            </button>
          </div>
        </div>

        {/* 統計概覽 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiTarget className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">總目標數</p>
                <p className="text-2xl font-bold text-gray-900">{goals.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiEdit className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">進行中</p>
                <p className="text-2xl font-bold text-gray-900">
                  {goals.filter(goal => {
                    const progress = calculateGoalProgress(goal);
                    return progress > 0 && progress < 100;
                  }).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiTarget className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">已完成</p>
                <p className="text-2xl font-bold text-gray-900">
                  {goals.filter(goal => calculateGoalProgress(goal) === 100).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiTrash2 className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">總子目標</p>
                <p className="text-2xl font-bold text-gray-900">
                  {goals.reduce((sum, goal) => sum + goal.subGoals.length, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 目標表單 */}
        {showForm && (
          <div className="mb-8">
            <GoalForm
              goal={editingGoal}
              onSave={handleSaveGoal}
              onCancel={handleCancel}
            />
          </div>
        )}

        {/* 目標列表 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">目標列表</h2>
          </div>
          <GoalList
            goals={goals}
            onEdit={handleEditGoal}
            onDelete={handleDeleteGoal}
            onToggleSubGoal={handleToggleSubGoal}
          />
        </div>
      </div>
    </div>
    </AuthGuard>
  );
}
