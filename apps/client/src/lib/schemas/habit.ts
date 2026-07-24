import { z } from "zod";

export const createHabitSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  frequency: z.enum(["daily", "weekly"]),
  category_id: z.string().min(1, "Category id is required"),
});

export type CreateHabitRequest = z.infer<typeof createHabitSchema>;
