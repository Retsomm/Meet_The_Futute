'use client';

import { FiUser, FiTarget, FiTrendingUp } from 'react-icons/fi';

export default function PersonalComparison({ goals, overallProgress }) {
  if (!goals || goals.length === 0) {
    return null;
  }

  // 計算統計數據
  const totalSubGoals = goals.reduce((sum, goal) => sum + goal.subGoals.length, 0);
  const completedSubGoals = goals.reduce((sum, goal) => 
    sum + goal.subGoals.filter(sg => sg.isCompleted).length, 0);
  
  const gapPercentage = 100 - overallProgress;
  
  // 獲取勵志訊息
  const getMotivationalMessage = (progress) => {
    if (progress >= 90) return "你已經非常接近理想的自己了！繼續保持！";
    if (progress >= 70) return "你正在穩步邁向目標，做得很好！";
    if (progress >= 50) return "已經完成一半的路程，持續努力！";
    if (progress >= 30) return "良好的開始，一步一腳印地前進！";
    if (progress >= 10) return "每一步都是進步，堅持下去！";
    return "開始行動就是最大的成功，加油！";
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "text-green-600";
    if (progress >= 60) return "text-blue-600";
    if (progress >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressBgColor = (progress) => {
    if (progress >= 80) return "bg-green-100 border-green-200";
    if (progress >= 60) return "bg-blue-100 border-blue-200";
    if (progress >= 40) return "bg-yellow-100 border-yellow-200";
    return "bg-red-100 border-red-200";
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">個人成長對比</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左側：當前狀態 vs 未來願景 */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <FiUser className="h-8 w-8 text-gray-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">目前的自己</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">完成的子目標：</span>
                  <span className="ml-2 font-medium text-gray-900">{completedSubGoals}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">整體進度：</span>
                  <span className={`ml-2 font-bold text-lg ${getProgressColor(overallProgress)}`}>
                    {overallProgress}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <FiTarget className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">未來的自己</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600">目標子任務：</span>
                    <span className="ml-2 font-medium text-gray-900">{totalSubGoals}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600">期望進度：</span>
                    <span className="ml-2 font-bold text-lg text-blue-600">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右側：差距分析 */}
        <div className="space-y-6">
          <div className={`p-6 rounded-lg border-2 ${getProgressBgColor(overallProgress)}`}>
            <div className="text-center">
              <FiTrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">成長差距</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {gapPercentage}%
              </div>
              <p className="text-sm text-gray-600">
                還需要完成 {totalSubGoals - completedSubGoals} 個子目標
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-3">💪 激勵訊息</h4>
            <p className="text-gray-700 leading-relaxed">
              {getMotivationalMessage(overallProgress)}
            </p>
          </div>

          {/* 進度條視覺化 */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">進度視覺化</span>
              <span className="font-medium">{overallProgress}% / 100%</span>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>目前的自己</span>
                <span>未來的自己</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部：詳細分析 */}
      <div className="mt-8 pt-6 border-t">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {((completedSubGoals / totalSubGoals) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 mt-1">子目標完成率</div>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {goals.filter(goal => {
                const progress = Math.round((goal.subGoals.filter(sg => sg.isCompleted).length / goal.subGoals.length) * 100);
                return progress > 0;
              }).length}
            </div>
            <div className="text-sm text-gray-600 mt-1">進行中的目標</div>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {totalSubGoals - completedSubGoals}
            </div>
            <div className="text-sm text-gray-600 mt-1">待完成任務</div>
          </div>
        </div>
      </div>
    </div>
  );
}
