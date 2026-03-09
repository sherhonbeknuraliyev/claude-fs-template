import { z } from "zod";

// --- Base schemas (reusable building blocks) ---

export const emailSchema = z.string().email("Invalid email address");
export const passwordSchema = z.string().min(8, "Password must be at least 8 characters");

// --- User schemas ---

export const userSchema = z.object({
  _id: z.string(),
  email: emailSchema,
  name: z.string().min(1, "Name is required"),
  role: z.enum(["user", "admin"]).default("user"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createUserSchema = userSchema
  .omit({
    _id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    password: passwordSchema,
  });

export const updateUserSchema = createUserSchema.partial().omit({ password: true });

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

// --- Inferred types (no manual type definitions needed!) ---

export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
