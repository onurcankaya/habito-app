import { z } from "zod";

const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;

export const createCategorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  color: z.string().regex(hexColorRegex, "Must be a valid hex color"),
});

export const updateCategorySchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  color: z
    .string()
    .regex(hexColorRegex, "Must be a valid hex color")
    .optional(),
});

export type CreateCategoryRequest = z.infer<typeof createCategorySchema>;
export type UpdateCategoryRequest = z.infer<typeof updateCategorySchema>;
