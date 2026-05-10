import type { Goal, SubGoal } from './types';

const STORAGE_KEY = 'personal-goals-cms';

class LocalStorageManager {
  getGoals(): Goal[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? (JSON.parse(data) as Goal[]) : [];
    } catch {
      console.error('Error reading from localStorage');
      return [];
    }
  }

  saveGoals(goals: Goal[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    } catch {
      console.error('Error saving to localStorage');
    }
  }

  addGoal(goal: Goal): Goal {
    const goals = this.getGoals();
    goals.push(goal);
    this.saveGoals(goals);
    return goal;
  }

  updateGoal(goalId: string, updates: Partial<Omit<Goal, 'id'>>): Goal | null {
    const goals = this.getGoals();
    const goalIndex = goals.findIndex((g) => g.id === goalId);
    if (goalIndex === -1) return null;

    goals[goalIndex] = {
      ...goals[goalIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.saveGoals(goals);
    return goals[goalIndex];
  }

  deleteGoal(goalId: string): void {
    const goals = this.getGoals().filter((g) => g.id !== goalId);
    this.saveGoals(goals);
  }

  updateSubGoal(
    goalId: string,
    subGoalId: string,
    updates: Partial<SubGoal>
  ): Goal | null {
    const goals = this.getGoals();
    const goalIndex = goals.findIndex((g) => g.id === goalId);
    if (goalIndex === -1) return null;

    const subGoalIndex = goals[goalIndex].subGoals.findIndex(
      (sg) => sg.id === subGoalId
    );
    if (subGoalIndex === -1) return null;

    goals[goalIndex].subGoals[subGoalIndex] = {
      ...goals[goalIndex].subGoals[subGoalIndex],
      ...updates,
      completedAt: updates.isCompleted ? new Date().toISOString() : null,
    };
    goals[goalIndex].updatedAt = new Date().toISOString();
    this.saveGoals(goals);
    return goals[goalIndex];
  }
}

export const storageManager = new LocalStorageManager();
