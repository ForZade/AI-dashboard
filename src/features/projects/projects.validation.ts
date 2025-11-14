import { z } from 'zod';

const VALID_COLORS = [
    "turquoise", "green", "blue", "purple", "pink",
    "yellow", "orange", "red", "slate", "gray"
] as const;

const projectName = z
  .string()
  .min(1, 'Name is required')
  .max(100, 'Name must be 100 characters or less')
  .trim();

const description = z
  .string()
  .max(500, 'Description must be 500 characters or less')
  .trim()
  .optional()
  .transform((val) => val ?? null);

const iconName = z
  .string()
  .min(1)
  .max(50)
  .regex(/^[a-zA-Z0-9-]+$/, 'Invalid icon name')
  .optional()
  .transform((val) => val ?? "chat");

const color = z
  .enum(VALID_COLORS, { message: 'Invalid color' })
  .optional()
  .transform((val) => val ?? "gray")

export const createProjectSchema = z.object({
  name: projectName,
  description,
  icon: iconName,
  color,
  position: z.number().int().min(0).optional(),
});