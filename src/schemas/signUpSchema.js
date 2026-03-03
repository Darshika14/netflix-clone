import { z } from "zod";

export const signUpSchema = z
  .object({
    fullName: z.string().min(2, "Minimum 8 characters required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Minimum 6 characters required"),
    confirmPassword: z.string().min(6, "Please confirm password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
