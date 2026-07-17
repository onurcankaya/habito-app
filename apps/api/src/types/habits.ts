export type CreateHabitDTO = {
  id: string;
  title: string;
  description: string | null;
  frequency: "daily" | "weekly";
  category_id: string;
};

export type UpdateHabitDTO = {
  title?: string;
  description?: string | null;
  frequency?: "daily" | "weekly";
  category_id?: string;
};
