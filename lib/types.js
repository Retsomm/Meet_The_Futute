// 目標類型定義
export const GoalStatus = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
};

// 生成唯一 ID 的輔助函數
const generateUniqueId = () => {
  return Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9);
};

// 創建新目標的預設結構
export const createNewGoal = (title, description, subGoalCount = 1) => {
  const goalId = generateUniqueId();
  return {
    id: goalId,
    title,
    description,
    currentSelfDescription: '',
    futureSelfDescription: '',
    subGoals: Array.from({ length: subGoalCount }, (_, index) => ({
      id: `${goalId}-sub-${index + 1}-${generateUniqueId()}`,
      title: `子目標 ${index + 1}`,
      description: '',
      isCompleted: false,
      completedAt: null
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

// 計算目標完成百分比
export const calculateGoalProgress = (goal) => {
  if (!goal.subGoals || goal.subGoals.length === 0) return 0;
  
  const completedSubGoals = goal.subGoals.filter(subGoal => subGoal.isCompleted).length;
  return Math.round((completedSubGoals / goal.subGoals.length) * 100);
};

// 計算與未來自己的差距（100% - 當前進度）
export const calculateGapToFuture = (goal) => {
  const progress = calculateGoalProgress(goal);
  return 100 - progress;
};
