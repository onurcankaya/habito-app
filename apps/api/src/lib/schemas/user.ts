import { z } from "zod";

export const updateUserSchema = z
  .object({
    email: z.email().optional(),
    password: z.string().min(8).optional(),
    first_name: z.string().min(1).optional(),
    last_name: z.string().min(1).optional(),
  })
  .strict();
