export const GoalStatus = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
} as const;

export type GoalStatusType = (typeof GoalStatus)[keyof typeof GoalStatus];

export type GoalFrequency = 'daily' | 'weekly' | 'monthly';

export interface CheckIn {
  id: string;
  goalId: string;
  date: string; // YYYY-MM-DD
  note: string;
  createdAt: string;
}

export interface SubGoal {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  completedAt: string | null;
  dueDate?: string;
  tempId?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  currentSelfDescription: string;
  futureSelfDescription: string;
  subGoals: SubGoal[];
  frequency: GoalFrequency;
  startDate: string; // YYYY-MM-DD
  endDate?: string;  // YYYY-MM-DD
  checkIns: CheckIn[];
  createdAt: string;
  updatedAt: string;
}

export interface SubGoalFormData {
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: string;
  id?: string;
  tempId?: string;
}

export interface GoalFormData {
  title: string;
  description: string;
  currentSelfDescription: string;
  futureSelfDescription: string;
  subGoals: SubGoalFormData[];
  frequency: GoalFrequency;
  startDate: string;
  endDate?: string;
  subGoalCount?: number;
}

const generateUniqueId = (): string =>
  Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9);

export const createNewGoal = (
  title: string,
  description: string,
  subGoalCount: number = 1,
  frequency: GoalFrequency = 'daily',
  startDate: string = new Date().toISOString().split('T')[0]
): Goal => {
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
      completedAt: null,
    })),
    frequency,
    startDate,
    checkIns: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const calculateGoalProgress = (goal: Goal): number => {
  if (!goal.subGoals || goal.subGoals.length === 0) return 0;
  const completedSubGoals = goal.subGoals.filter((sg) => sg.isCompleted).length;
  return Math.round((completedSubGoals / goal.subGoals.length) * 100);
};

export const calculateGapToFuture = (goal: Goal): number => {
  return 100 - calculateGoalProgress(goal);
};

export const getTodayString = (): string =>
  new Date().toISOString().split('T')[0];

export const hasCheckedInToday = (goal: Goal): boolean =>
  goal.checkIns.some((c) => c.date === getTodayString());

export const calculateCheckInRate = (goal: Goal): { rate: number; checkedDays: number; totalDays: number } => {
  const today = getTodayString();
  const start = goal.startDate;
  if (!start) return { rate: 0, checkedDays: 0, totalDays: 0 };

  const effectiveEnd = goal.endDate && goal.endDate < today ? goal.endDate : today;
  const startDate = new Date(start + 'T00:00:00');
  const endDate = new Date(effectiveEnd + 'T00:00:00');

  if (endDate < startDate) return { rate: 0, checkedDays: 0, totalDays: 0 };

  const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const checkInDates = new Set(goal.checkIns?.map((c) => c.date) ?? []);

  let checkedDays = 0;
  const cursor = new Date(startDate);
  while (cursor <= endDate) {
    if (checkInDates.has(cursor.toISOString().split('T')[0])) checkedDays++;
    cursor.setDate(cursor.getDate() + 1);
  }

  return {
    rate: totalDays > 0 ? Math.round((checkedDays / totalDays) * 100) : 0,
    checkedDays,
    totalDays,
  };
};

export const isPendingCheckIn = (goal: Goal): boolean => {
  const now = new Date();
  if (now.getHours() < 6) return false;
  const today = getTodayString();
  if (goal.endDate && goal.endDate < today) return false;
  if (goal.startDate > today) return false;
  return !hasCheckedInToday(goal);
};
