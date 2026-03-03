import { z } from "zod";

export const feedbackSchema = z.object({
  fullName: z.string().min(2, "Minimum 2 characters required"),

  email: z.string().email("Invalid email format"),

  age: z.coerce
    .number()
    .min(13, "You must be at least 13 years old")
    .max(100, "Invalid age"),

  gender: z.string().min(1, "Please select your gender"),

  subscriptionPlan: z.string().min(1, "Please select a plan"),

  usageFrequency: z.string().min(1, "Please select usage"),

  favoriteGenres: z.array(z.string()).min(1, "Select at least one genre"),

  recommend: z.string().min(1, "Please select an option"),

  rating: z.coerce
    .number()
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5"),

  feedback: z.string().min(15, "Feedback must be at least 15 characters"),
});
