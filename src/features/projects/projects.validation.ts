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
  .optional();

const iconName = z
  .string()
  .min(1)
  .max(50)
  .regex(/^[a-zA-Z0-9-]+$/, 'Invalid icon name')
  .optional();

const color = z
  .enum(VALID_COLORS, { message: 'Invalid color' })
  .optional();

export const createProjectSchema = z.object({
  name: projectName,
  description,
  icon: iconName,
  color,
  folderId: z.string().regex(/^\d+$/).nullable().optional(),
  position: z.number().int().min(0).optional(),
});