'use client';

import { FiUser, FiTarget, FiTrendingUp } from 'react-icons/fi';
import type { Goal } from '../../lib/types';

interface PersonalComparisonProps {
  goals: Goal[];
  overallProgress: number;
}

export default function PersonalComparison({
  goals,
  overallProgress,
}: PersonalComparisonProps) {
  if (!goals || goals.length === 0) return null;

  const totalSubGoals = goals.reduce((sum, g) => sum + g.subGoals.length, 0);
  const completedSubGoals = goals.reduce(
    (sum, g) => sum + g.subGoals.filter((sg) => sg.isCompleted).length,
    0
  );

  const gapPercentage = 100 - overallProgress;

  const getMotivationalMessage = (progress: number): string => {
    if (progress >= 90) return '你已經非常接近理想的自己了！繼續保持！';
    if (progress >= 70) return '你正在穩步邁向目標，做得很好！';
    if (progress >= 50) return '已經完成一半的路程，持續努力！';
    if (progress >= 30) return '良好的開始，一步一腳印地前進！';
    if (progress >= 10) return '每一步都是進步，堅持下去！';
    return '開始行動就是最大的成功，加油！';
  };

  const getProgressColor = (progress: number): string => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-blue-600';
    if (progress >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBgColor = (progress: number): string => {
    if (progress >= 80)
      return 'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    if (progress >= 60)
      return 'bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    if (progress >= 40)
      return 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    return 'bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-800';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        個人成長對比
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
                <FiUser className="h-8 w-8 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                目前的自己
              </h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    完成的子目標：
                  </span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {completedSubGoals}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    整體進度：
                  </span>
                  <span
                    className={`ml-2 font-bold text-lg ${getProgressColor(overallProgress)}`}
                  >
                    {overallProgress}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center transition-colors">
                  <FiTarget className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  未來的自己
                </h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      目標子任務：
                    </span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {totalSubGoals}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      期望進度：
                    </span>
                    <span className="ml-2 font-bold text-lg text-blue-600 dark:text-blue-400">
                      100%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div
            className={`p-6 rounded-lg border-2 ${getProgressBgColor(overallProgress)} transition-colors`}
          >
            <div className="text-center">
              <FiTrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                成長差距
              </h3>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {gapPercentage}%
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                還需要完成 {totalSubGoals - completedSubGoals} 個子目標
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 transition-colors">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              💪 激勵訊息
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {getMotivationalMessage(overallProgress)}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                進度視覺化
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {overallProgress}% / 100%
              </span>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 h-4 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span>目前的自己</span>
                <span>未來的自己</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg transition-colors">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {((completedSubGoals / totalSubGoals) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              子目標完成率
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {
                goals.filter((g) => {
                  const p = Math.round(
                    (g.subGoals.filter((sg) => sg.isCompleted).length /
                      g.subGoals.length) *
                      100
                  );
                  return p > 0;
                }).length
              }
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              進行中的目標
            </div>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg transition-colors">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {totalSubGoals - completedSubGoals}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              待完成任務
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
