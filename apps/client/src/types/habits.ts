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
  is_completed?: boolean;
};

export type HabitsResponse = Habit[];
