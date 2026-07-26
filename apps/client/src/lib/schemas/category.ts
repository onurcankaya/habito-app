import { z } from "zod";

export const createCategorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
});

export type CreateCategoryRequest = z.infer<typeof createCategorySchema>;
