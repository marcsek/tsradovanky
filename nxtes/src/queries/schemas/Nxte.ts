import { z } from "zod";

export const NxteSchema = z.object({
  title: z.string(),
  value: z.string(),
  id: z.string().uuid(),
  createdAt: z.date(),
  color: z.string(),
});
