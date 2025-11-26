import { z } from 'zod';

const VALID_COLORS = [
    "turquoise", "green", "blue", "purple", "pink",
    "yellow", "orange", "red", "slate", "gray"
] as const;

export const createProjectSchema = z.object({
  name: z.string().min(1, "Name is required").max(64, "Name must be 64 characters or less").trim(),
  icon: z.string().min(1).max(50).optional().transform(val => val ?? "chat"),
  color: z.enum(VALID_COLORS, "Invalid colors").optional().transform(val => val ?? "gray"),
  position: z.number().int().min(0).optional(),
});

export const updateProjectSchema = z.object({
  name: z.string().min(1, "Name is required").max(64, "Name must be 64 characters or less").trim().optional(),
  icon: z.string().min(1).max(50).optional(),
  color: z.enum(VALID_COLORS, "Invalid colors").optional(),
});

export type CreateProjectType = z.infer<typeof createProjectSchema>;
export type UpdateProjectType = z.infer<typeof updateProjectSchema>;