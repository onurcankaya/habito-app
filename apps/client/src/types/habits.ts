export type Habit = {
  id: string;
  title: string;
  description: string | null;
  frequency: "daily" | "weekly";
  created_at: string;
  updated_at: string;
  user_id: string;
  category_id: string;
  category_title: string;
};

export type HabitWithCompletion = Habit & {
  is_completed: boolean;
  activity_id: string | null;
};

export type FetchHabitsResponse = Habit[];

export type CreateHabitResponse = Habit;
