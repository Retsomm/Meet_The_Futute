'use client';

import { useState, useEffect } from 'react';
import { storageManager } from '../../lib/storage';
import { calculateGoalProgress, calculateGapToFuture } from '../../lib/types';
import { loadSampleData, sampleGoals } from '../../data/sampleData';
import GoalProgressChart from '../components/GoalProgressChart';
import PersonalComparison from '../components/PersonalComparison';
import AuthGuard from '../components/AuthGuard';
import { useAlert } from '../components/Alert';
import { FiTarget, FiTrendingUp, FiUser, FiCheckCircle, FiDatabase } from 'react-icons/fi';

export default function Home() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSample, setLoadingSample] = useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    const loadGoals = () => {
      const savedGoals = storageManager.getGoals();
      setGoals(savedGoals);
      setLoading(false);
    };

    loadGoals();
  }, []);

  const handleLoadSampleData = async () => {
    setLoadingSample(true);
    
    try {
      const existingGoals = storageManager.getGoals();
      
      // 模擬載入延遲，讓用戶看到載入狀態
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 檢查是否已經載入過範例資料（避免重複加入）
      const hasSampleData = existingGoals.some(goal => 
        sampleGoals.some(sample => sample.title === goal.title)
      );
      
      if (hasSampleData) {
        showAlert('範例資料已存在，無需重複載入。', 'warning');
        setLoadingSample(false);
        return;
      }
      
      // 為範例資料生成新的 ID，避免與現有目標衝突
      const newSampleGoals = sampleGoals.map((goal, index) => ({
        ...goal,
        id: `sample-${Date.now()}-${index}`,
        subGoals: goal.subGoals.map((subGoal, subIndex) => ({
          ...subGoal,
          id: `sub-${Date.now()}-${index}-${subIndex}`
        }))
      }));
      
      // 將範例資料加入現有目標
      const updatedGoals = [...existingGoals, ...newSampleGoals];
      storageManager.saveGoals(updatedGoals);
      setGoals(updatedGoals);
      
      const message = existingGoals.length > 0 
        ? `範例資料已成功加入！新增了 ${newSampleGoals.length} 個範例目標到您現有的 ${existingGoals.length} 個目標中。`
        : '範例資料載入成功！現在您可以體驗完整的目標追蹤功能。';
      
      showAlert(message, 'success', 6000);
    } catch (error) {
      console.error('載入範例資料時發生錯誤:', error);
      showAlert('載入範例資料時發生錯誤，請稍後再試。', 'error');
    } finally {
      setLoadingSample(false);
    }
  };

  const overallProgress = goals.length > 0 
    ? Math.round(goals.reduce((sum, goal) => sum + calculateGoalProgress(goal), 0) / goals.length)
    : 0;

  const completedGoals = goals.filter(goal => calculateGoalProgress(goal) === 100).length;
  const totalSubGoals = goals.reduce((sum, goal) => sum + goal.subGoals.length, 0);
  const completedSubGoals = goals.reduce((sum, goal) => 
    sum + goal.subGoals.filter(sg => sg.isCompleted).length, 0);

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 頁面標題 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            目標追蹤儀表板
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            量化你與未來自己的差距，見證每一步的成長進度
          </p>
        </div>

        {goals.length === 0 ? (
          <div className="text-center py-16">
            <FiTarget className="mx-auto h-24 w-24 text-gray-400 mb-8" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              還沒有設定任何目標
            </h2>
            <p className="text-gray-600 mb-8">
              前往後台管理建立你的第一個目標，開始追蹤成長進度
            </p>
            <div className="flex justify-center space-x-4">            <a
              href="/admin"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <FiTarget className="mr-2 h-5 w-5" />
              建立第一個目標
            </a>
              <button
                onClick={handleLoadSampleData}
                disabled={loadingSample}
                className={`inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md transition-colors ${
                  loadingSample 
                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
                    : 'text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                {loadingSample ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-2"></div>
                    載入中...
                  </>
                ) : (
                  <>
                    <FiDatabase className="mr-2 h-5 w-5" />
                    加入範例資料
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 統計卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
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

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FiCheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">已完成目標</p>
                    <p className="text-2xl font-bold text-gray-900">{completedGoals}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FiTrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">整體進度</p>
                    <p className="text-2xl font-bold text-gray-900">{overallProgress}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FiUser className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">與未來差距</p>
                    <p className="text-2xl font-bold text-gray-900">{100 - overallProgress}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 進度圖表 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">目標進度總覽</h2>
              <GoalProgressChart goals={goals} />
            </div>

            {/* 個人對比 */}
            <PersonalComparison goals={goals} overallProgress={overallProgress} />

            {/* 目標詳細列表 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">詳細進度</h2>
              <div className="space-y-6">
                {goals.map((goal) => {
                  const progress = calculateGoalProgress(goal);
                  const gap = calculateGapToFuture(goal);
                  
                  return (
                    <div key={goal.id} className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                          <p className="text-gray-600 mt-1">{goal.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-blue-600">{progress}%</span>
                          <p className="text-sm text-gray-500">完成度</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>進度</span>
                          <span>{goal.subGoals.filter(sg => sg.isCompleted).length} / {goal.subGoals.length} 子目標</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-700">目前的自己：</p>
                          <p className="text-gray-600 mt-1">{goal.currentSelfDescription || '尚未設定'}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">未來的自己：</p>
                          <p className="text-gray-600 mt-1">{goal.futureSelfDescription || '尚未設定'}</p>
                        </div>
                      </div>

                      {gap > 0 && (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                          <p className="text-sm text-yellow-800">
                            <span className="font-medium">與未來自己還有 {gap}% 的差距</span>
                            {gap <= 25 && " - 很接近目標了！"}
                            {gap > 25 && gap <= 50 && " - 已經完成一半以上！"}
                            {gap > 50 && gap <= 75 && " - 持續努力中"}
                            {gap > 75 && " - 剛開始的路程"}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </AuthGuard>
  );
}
