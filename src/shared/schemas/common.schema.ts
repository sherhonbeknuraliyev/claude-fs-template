import { z } from "zod";

// --- Pagination ---

export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

export const paginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  });

// --- Common filters ---

export const idParamSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

export const searchSchema = z.object({
  q: z.string().optional(),
});

// --- API Error ---

export const apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.record(z.unknown()).optional(),
});

// --- Types ---

export type Pagination = z.infer<typeof paginationSchema>;
export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
export type IdParam = z.infer<typeof idParamSchema>;
export type ApiError = z.infer<typeof apiErrorSchema>;
