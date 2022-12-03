import { z } from "zod";

export const updateProfileValidationSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters long")
    .max(15, "Name cannot be longer than 15 characters"),
  email: z.string({ required_error: "Email is required" }).email("Enter a valid email"),
});
