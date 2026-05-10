import { getSupabase } from './supabase';
import type { Goal, SubGoal, CheckIn, GoalFrequency } from './types';

const requireClient = () => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  return client;
};

type GoalRow = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  current_self_description: string | null;
  future_self_description: string | null;
  frequency: GoalFrequency;
  start_date: string;
  end_date: string | null;
  sub_goals: SubGoal[];
  check_ins: CheckIn[];
  created_at: string;
  updated_at: string | null;
};

const rowToGoal = (row: GoalRow): Goal => ({
  id: row.id,
  title: row.title,
  description: row.description ?? '',
  currentSelfDescription: row.current_self_description ?? '',
  futureSelfDescription: row.future_self_description ?? '',
  frequency: row.frequency ?? 'daily',
  startDate: row.start_date,
  endDate: row.end_date ?? undefined,
  subGoals: (row.sub_goals ?? []).map((sg) => ({
    ...sg,
    completedAt: sg.completedAt ?? null,
  })),
  checkIns: row.check_ins ?? [],
  createdAt: row.created_at,
  updatedAt: row.updated_at ?? '',
});

const goalToRow = (userId: string, goal: Goal): Omit<GoalRow, 'created_at' | 'updated_at'> => ({
  id: goal.id,
  user_id: userId,
  title: goal.title,
  description: goal.description ?? null,
  current_self_description: goal.currentSelfDescription ?? null,
  future_self_description: goal.futureSelfDescription ?? null,
  frequency: goal.frequency,
  start_date: goal.startDate,
  end_date: goal.endDate ?? null,
  sub_goals: goal.subGoals,
  check_ins: goal.checkIns,
});

export const supabaseStorage = {
  async getGoals(userId: string): Promise<Goal[]> {
    const sb = requireClient();
    const { data, error } = await sb
      .from('goals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return (data as GoalRow[]).map(rowToGoal);
  },

  async addGoal(userId: string, goal: Goal): Promise<void> {
    const sb = requireClient();
    const { error } = await sb.from('goals').insert({
      ...goalToRow(userId, goal),
      created_at: goal.createdAt,
    });
    if (error) throw error;
  },

  async updateGoal(
    userId: string,
    goalId: string,
    updates: Partial<Omit<Goal, 'id'>>
  ): Promise<Goal | null> {
    const sb = requireClient();

    const patch: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };
    if (updates.title !== undefined) patch.title = updates.title;
    if (updates.description !== undefined) patch.description = updates.description;
    if (updates.currentSelfDescription !== undefined) patch.current_self_description = updates.currentSelfDescription;
    if (updates.futureSelfDescription !== undefined) patch.future_self_description = updates.futureSelfDescription;
    if (updates.frequency !== undefined) patch.frequency = updates.frequency;
    if (updates.startDate !== undefined) patch.start_date = updates.startDate;
    if (updates.endDate !== undefined) patch.end_date = updates.endDate ?? null;
    if (updates.subGoals !== undefined) patch.sub_goals = updates.subGoals;
    if (updates.checkIns !== undefined) patch.check_ins = updates.checkIns;

    const { data, error } = await sb
      .from('goals')
      .update(patch)
      .eq('id', goalId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data ? rowToGoal(data as GoalRow) : null;
  },

  async deleteGoal(userId: string, goalId: string): Promise<void> {
    const sb = requireClient();
    const { error } = await sb
      .from('goals')
      .delete()
      .eq('id', goalId)
      .eq('user_id', userId);
    if (error) throw error;
  },

  async updateSubGoal(
    userId: string,
    goalId: string,
    subGoalId: string,
    updates: Partial<SubGoal>
  ): Promise<Goal | null> {
    const sb = requireClient();
    const { data: existing, error: fetchErr } = await sb
      .from('goals')
      .select('*')
      .eq('id', goalId)
      .eq('user_id', userId)
      .single();

    if (fetchErr || !existing) return null;
    const goal = rowToGoal(existing as GoalRow);

    const subGoals = goal.subGoals.map((sg) =>
      sg.id === subGoalId
        ? {
            ...sg,
            ...updates,
            completedAt: updates.isCompleted ? new Date().toISOString() : null,
          }
        : sg
    );

    return this.updateGoal(userId, goalId, { subGoals });
  },

  async addCheckIn(
    userId: string,
    goalId: string,
    date: string,
    note: string
  ): Promise<Goal | null> {
    const sb = requireClient();
    const { data: existing, error: fetchErr } = await sb
      .from('goals')
      .select('*')
      .eq('id', goalId)
      .eq('user_id', userId)
      .single();

    if (fetchErr || !existing) return null;
    const goal = rowToGoal(existing as GoalRow);

    const checkIn: CheckIn = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      goalId,
      date,
      note,
      createdAt: new Date().toISOString(),
    };
    const checkIns = [...goal.checkIns, checkIn];

    return this.updateGoal(userId, goalId, { checkIns });
  },

  async deleteCheckIn(
    userId: string,
    goalId: string,
    checkInId: string
  ): Promise<Goal | null> {
    const sb = requireClient();
    const { data: existing, error: fetchErr } = await sb
      .from('goals')
      .select('*')
      .eq('id', goalId)
      .eq('user_id', userId)
      .single();

    if (fetchErr || !existing) return null;
    const goal = rowToGoal(existing as GoalRow);
    const checkIns = goal.checkIns.filter((c) => c.id !== checkInId);

    return this.updateGoal(userId, goalId, { checkIns });
  },

  getAllCheckInsByDate(goals: Goal[]): Record<string, number> {
    const map: Record<string, number> = {};
    for (const goal of goals) {
      for (const c of goal.checkIns ?? []) {
        map[c.date] = (map[c.date] ?? 0) + 1;
      }
    }
    return map;
  },
};
