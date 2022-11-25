import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email("Enter a valid email"),
  password: z.string({ required_error: "Password is required" }).min(8, "Must have at least 8 characters"),
});

export const registerValidatioSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters long")
    .max(15, "Name cannot be longer than 15 characters"),
  email: z.string({ required_error: "Email is required" }).email("Enter a valid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Must have at least 8 characters")
    .regex(/^(?=.*\d)(?=.*[a-z]).{8,40}$/, "Password must containt one digit"),
});
