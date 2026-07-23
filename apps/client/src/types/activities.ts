export type Activity = {
  id: string;
  notes: string | null;
  completed_at: string;
  user_id: string;
  habit_id: string;
  habit_title: string;
  category_title: string;
};

export type FetchActivitiesResponse = Activity[];

export type CreateActivityRequest = {
  habit_id: string;
  completed_at: string;
};

export type CreateActivityResponse = Activity;
