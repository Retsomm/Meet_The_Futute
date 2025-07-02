'use client';

import { useState, useEffect } from 'react';
import { useAlert } from './Alert';
import { FiSave, FiX, FiPlus, FiMinus } from 'react-icons/fi';

export default function GoalForm({ goal, onSave, onCancel }) {
  const { showAlert } = useAlert();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    currentSelfDescription: '',
    futureSelfDescription: '',
    subGoals: [{ title: '子目標 1', description: '', isCompleted: false, dueDate: '', tempId: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` }]
  });

  // 獲取今天的日期作為最小值
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // 計算距離到期日的天數
  const getDaysUntilDue = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  useEffect(() => {
    if (goal) {
      setFormData({
        title: goal.title,
        description: goal.description,
        currentSelfDescription: goal.currentSelfDescription || '',
        futureSelfDescription: goal.futureSelfDescription || '',
        subGoals: goal.subGoals.map(sg => ({
          title: sg.title,
          description: sg.description,
          isCompleted: sg.isCompleted,
          dueDate: sg.dueDate || '',
          id: sg.id,
          tempId: sg.tempId // 保留原有的 tempId，如果沒有則為 undefined
        }))
      });
    }
  }, [goal]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubGoalChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      subGoals: prev.subGoals.map((sg, i) => 
        i === index ? { ...sg, [field]: value } : sg
      )
    }));
  };

  const addSubGoal = () => {
    setFormData(prev => ({
      ...prev,
      subGoals: [
        ...prev.subGoals,
        {
          title: `子目標 ${prev.subGoals.length + 1}`,
          description: '',
          isCompleted: false,
          dueDate: '',
          tempId: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        }
      ]
    }));
  };

  const removeSubGoal = (index) => {
    if (formData.subGoals.length > 1) {
      setFormData(prev => ({
        ...prev,
        subGoals: prev.subGoals.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      showAlert('請輸入目標標題', 'warning');
      return;
    }

    if (formData.subGoals.some(sg => !sg.title.trim())) {
      showAlert('請確保所有子目標都有標題', 'warning');
      return;
    }

    onSave({
      ...formData,
      subGoalCount: formData.subGoals.length
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {goal ? '編輯目標' : '新增目標'}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* 基本資訊 */}
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              目標標題 *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700 transition-colors"
              placeholder="輸入你的目標標題"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              目標描述
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700 transition-colors"
              placeholder="描述這個目標的詳細內容"
            />
          </div>
        </div>

        {/* 自我描述 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              目前的自己（0%）
            </label>
            <textarea
              value={formData.currentSelfDescription}
              onChange={(e) => handleInputChange('currentSelfDescription', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700 transition-colors"
              placeholder="描述你目前的狀態，作為起點"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              未來的自己（100%）
            </label>
            <textarea
              value={formData.futureSelfDescription}
              onChange={(e) => handleInputChange('futureSelfDescription', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700 transition-colors"
              placeholder="描述你理想中的狀態，作為目標"
            />
          </div>
        </div>

        {/* 子目標 */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              子目標列表 *
            </label>
            <button
              type="button"
              onClick={addSubGoal}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
            >
              <FiPlus className="mr-1 h-4 w-4" />
              新增子目標
            </button>
          </div>

          <div className="space-y-4">
            {formData.subGoals.map((subGoal, index) => (
              <div key={subGoal.id || subGoal.tempId || `subgoal-${index}`} className="border border-gray-200 dark:border-gray-600 rounded-md p-4 bg-gray-50 dark:bg-gray-700/50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    子目標 {index + 1}
                  </h4>
                  {formData.subGoals.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSubGoal(index)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                    >
                      <FiMinus className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <input
                      type="text"
                      value={subGoal.title}
                      onChange={(e) => handleSubGoalChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700 transition-colors"
                      placeholder="子目標標題"
                      required
                    />
                  </div>

                  <div>
                    <textarea
                      value={subGoal.description}
                      onChange={(e) => handleSubGoalChange(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700 transition-colors"
                      placeholder="子目標描述"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      目標到期日
                    </label>
                    <input
                      type="date"
                      value={subGoal.dueDate}
                      onChange={(e) => handleSubGoalChange(index, 'dueDate', e.target.value)}
                      min={getTodayDate()}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700 transition-colors"
                    />
                    {subGoal.dueDate && (
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {(() => {
                          const daysLeft = getDaysUntilDue(subGoal.dueDate);
                          if (daysLeft > 0) {
                            return `還有 ${daysLeft} 天`;
                          } else if (daysLeft === 0) {
                            return '今天到期';
                          } else {
                            return `已過期 ${Math.abs(daysLeft)} 天`;
                          }
                        })()}
                      </div>
                    )}
                  </div>

                  {goal && (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`subgoal-${index}`}
                        checked={subGoal.isCompleted}
                        onChange={(e) => handleSubGoalChange(index, 'isCompleted', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`subgoal-${index}`} className="ml-2 text-sm text-gray-700">
                        已完成
                      </label>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              💡 提示：當你完成 {Math.round((1 / formData.subGoals.length) * 100)}% 的子目標時，
              你與未來的自己就會縮近 {Math.round((1 / formData.subGoals.length) * 100)}% 的差距！
            </p>
          </div>
        </div>

        {/* 按鈕 */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FiX className="mr-2 h-4 w-4" />
            取消
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          >
            <FiSave className="mr-2 h-4 w-4" />
            {goal ? '更新目標' : '創建目標'}
          </button>
        </div>
      </form>
    </div>
  );
}
