export const GoalStatus = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
} as const;

export type GoalStatusType = (typeof GoalStatus)[keyof typeof GoalStatus];

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
  subGoalCount?: number;
}

const generateUniqueId = (): string =>
  Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9);

export const createNewGoal = (
  title: string,
  description: string,
  subGoalCount: number = 1
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
