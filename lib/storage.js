// 簡單的本地存儲管理器
class LocalStorageManager {
  constructor() {
    this.STORAGE_KEY = 'personal-goals-cms';
  }

  // 獲取所有目標
  getGoals() {
    if (typeof window === 'undefined') return [];
    
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }

  // 保存目標
  saveGoals(goals) {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(goals));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  // 添加新目標
  addGoal(goal) {
    const goals = this.getGoals();
    goals.push(goal);
    this.saveGoals(goals);
    return goal;
  }

  // 更新目標
  updateGoal(goalId, updates) {
    const goals = this.getGoals();
    const goalIndex = goals.findIndex(goal => goal.id === goalId);
    
    if (goalIndex !== -1) {
      goals[goalIndex] = { 
        ...goals[goalIndex], 
        ...updates, 
        updatedAt: new Date().toISOString() 
      };
      this.saveGoals(goals);
      return goals[goalIndex];
    }
    
    return null;
  }

  // 刪除目標
  deleteGoal(goalId) {
    const goals = this.getGoals();
    const filteredGoals = goals.filter(goal => goal.id !== goalId);
    this.saveGoals(filteredGoals);
  }

  // 更新子目標
  updateSubGoal(goalId, subGoalId, updates) {
    const goals = this.getGoals();
    const goalIndex = goals.findIndex(goal => goal.id === goalId);
    
    if (goalIndex !== -1) {
      const subGoalIndex = goals[goalIndex].subGoals.findIndex(sg => sg.id === subGoalId);
      
      if (subGoalIndex !== -1) {
        goals[goalIndex].subGoals[subGoalIndex] = {
          ...goals[goalIndex].subGoals[subGoalIndex],
          ...updates,
          completedAt: updates.isCompleted ? new Date().toISOString() : null
        };
        
        goals[goalIndex].updatedAt = new Date().toISOString();
        this.saveGoals(goals);
        return goals[goalIndex];
      }
    }
    
    return null;
  }
}

export const storageManager = new LocalStorageManager();
