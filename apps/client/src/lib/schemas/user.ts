import { z } from "zod";

export const updateUserSchema = z.object({
  email: z.string().email("Invalid email").optional(),
  password: z.union([z.string().min(8), z.literal("")]).optional(),
  first_name: z.string().min(1).optional(),
  last_name: z.string().min(1).optional(),
});

export type UpdateUserRequest = z.infer<typeof updateUserSchema>;
