import type { Goal, SubGoal, CheckIn, GoalFrequency } from './types';

const STORAGE_KEY = 'personal-goals-cms';

class LocalStorageManager {
  getGoals(): Goal[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      const goals = data ? (JSON.parse(data) as Goal[]) : [];
      // Migrate old goals that don't have new fields
      return goals.map((g) => ({
        ...g,
        frequency: g.frequency ?? ('daily' as GoalFrequency),
        startDate: g.startDate ?? g.createdAt.split('T')[0],
        checkIns: g.checkIns ?? [],
      }));
    } catch {
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

  addCheckIn(goalId: string, date: string, note: string): Goal | null {
    const goals = this.getGoals();
    const goalIndex = goals.findIndex((g) => g.id === goalId);
    if (goalIndex === -1) return null;

    const checkIn: CheckIn = {
      id: Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9),
      goalId,
      date,
      note,
      createdAt: new Date().toISOString(),
    };

    goals[goalIndex].checkIns = [...(goals[goalIndex].checkIns ?? []), checkIn];
    goals[goalIndex].updatedAt = new Date().toISOString();
    this.saveGoals(goals);
    return goals[goalIndex];
  }

  deleteCheckIn(goalId: string, checkInId: string): Goal | null {
    const goals = this.getGoals();
    const goalIndex = goals.findIndex((g) => g.id === goalId);
    if (goalIndex === -1) return null;

    goals[goalIndex].checkIns = goals[goalIndex].checkIns.filter(
      (c) => c.id !== checkInId
    );
    goals[goalIndex].updatedAt = new Date().toISOString();
    this.saveGoals(goals);
    return goals[goalIndex];
  }

  // Aggregate check-ins across all goals by date → { date: count }
  getAllCheckInsByDate(): Record<string, number> {
    const goals = this.getGoals();
    const map: Record<string, number> = {};
    for (const goal of goals) {
      for (const c of goal.checkIns ?? []) {
        map[c.date] = (map[c.date] ?? 0) + 1;
      }
    }
    return map;
  }

  getTotalCheckIns(): number {
    const goals = this.getGoals();
    return goals.reduce((sum, g) => sum + (g.checkIns?.length ?? 0), 0);
  }
}

export const storageManager = new LocalStorageManager();
