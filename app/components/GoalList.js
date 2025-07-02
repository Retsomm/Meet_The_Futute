'use client';

import { calculateGoalProgress } from '../../lib/types';
import { FiEdit, FiTrash2, FiCheckCircle, FiCircle, FiCalendar } from 'react-icons/fi';

export default function GoalList({ goals, onEdit, onDelete, onToggleSubGoal }) {
  if (!goals || goals.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-gray-400 dark:text-gray-500 mb-4">
          <FiCircle className="mx-auto h-16 w-16" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">還沒有目標</h3>
        <p className="text-gray-600 dark:text-gray-300">點擊上方的「新增目標」按鈕來創建你的第一個目標</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return '未設定';
    return new Date(dateString).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return 'text-green-600';
    if (progress >= 75) return 'text-blue-600';
    if (progress >= 50) return 'text-yellow-600';
    if (progress >= 25) return 'text-orange-600';
    return 'text-red-600';
  };

  const getProgressBgColor = (progress) => {
    if (progress === 100) return 'bg-green-600';
    if (progress >= 75) return 'bg-blue-600';
    if (progress >= 50) return 'bg-yellow-600';
    if (progress >= 25) return 'bg-orange-600';
    return 'bg-red-600';
  };

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {goals.map((goal) => {
        const progress = calculateGoalProgress(goal);
        const completedSubGoals = goal.subGoals.filter(sg => sg.isCompleted).length;

        return (
          <div key={goal.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {goal.title}
                  </h3>
                  <span className={`text-lg font-bold ${getProgressColor(progress)}`}>
                    {progress}%
                  </span>
                </div>
                
                {goal.description && (
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{goal.description}</p>
                )}

                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <FiCalendar className="mr-1 h-4 w-4" />
                    建立於 {formatDate(goal.createdAt)}
                  </div>
                  <div className="flex items-center">
                    <FiCheckCircle className="mr-1 h-4 w-4" />
                    {completedSubGoals} / {goal.subGoals.length} 子目標完成
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => onEdit(goal)}
                  className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                  title="編輯目標"
                >
                  <FiEdit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(goal.id)}
                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                  title="刪除目標"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* 進度條 */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span>完成進度</span>
                <span>{completedSubGoals} / {goal.subGoals.length}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressBgColor(progress)}`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* 自我描述 */}
            {(goal.currentSelfDescription || goal.futureSelfDescription) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                {goal.currentSelfDescription && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">目前的自己</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{goal.currentSelfDescription}</p>
                  </div>
                )}
                {goal.futureSelfDescription && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">未來的自己</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{goal.futureSelfDescription}</p>
                  </div>
                )}
              </div>
            )}

            {/* 子目標列表 */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">子目標</h4>
              <div className="space-y-2">
                {goal.subGoals.map((subGoal, index) => (
                  <div
                    key={subGoal.id || `subgoal-${goal.id}-${index}`}
                    className={`flex items-start space-x-3 p-3 rounded-md border ${
                      subGoal.isCompleted 
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                        : 'bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-600'
                    } transition-colors`}
                  >
                    <button
                      onClick={() => onToggleSubGoal(goal.id, subGoal.id, !subGoal.isCompleted)}
                      className={`flex-shrink-0 mt-0.5 h-5 w-5 rounded-full flex items-center justify-center transition-colors ${
                        subGoal.isCompleted
                          ? 'bg-green-600 dark:bg-green-500 text-white'
                          : 'border-2 border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400'
                      }`}
                    >
                      {subGoal.isCompleted && <FiCheckCircle className="h-3 w-3" />}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h5 className={`text-sm font-medium ${
                          subGoal.isCompleted ? 'text-green-800 dark:text-green-300 line-through' : 'text-gray-900 dark:text-white'
                        }`}>
                          {index + 1}. {subGoal.title}
                        </h5>
                        {subGoal.isCompleted && (
                          <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                            +{Math.round(100 / goal.subGoals.length)}%
                          </span>
                        )}
                      </div>
                      
                      {subGoal.description && (
                        <p className={`text-sm mt-1 ${
                          subGoal.isCompleted ? 'text-green-700 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'
                        }`}>
                          {subGoal.description}
                        </p>
                      )}
                      
                      {subGoal.isCompleted && subGoal.completedAt && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                          完成於 {formatDate(subGoal.completedAt)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 底部統計 */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center text-sm">
                <div className="text-gray-600 dark:text-gray-400">
                  更新時間：{formatDate(goal.updatedAt)}
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 dark:text-gray-400">
                    與未來差距：
                  </span>
                  <span className={`font-bold ${getProgressColor(100 - progress)}`}>
                    {100 - progress}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
