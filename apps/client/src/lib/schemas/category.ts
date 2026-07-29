import { z } from "zod";

export const createCategorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
});

export const updateCategorySchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
});

export type CreateCategoryRequest = z.infer<typeof createCategorySchema>;
export type UpdateCategoryRequest = z.infer<typeof updateCategorySchema>;
