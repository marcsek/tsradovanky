import { z } from "zod";

export const handleZodParseSchema = <T>(schema: z.ZodSchema<T>, value: any) => {
  if (!schema.safeParse(value).success) {
    throw new Error("Parsing Schema Failed");
  }

  return value as T;
};
