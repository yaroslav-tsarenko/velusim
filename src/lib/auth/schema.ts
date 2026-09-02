import { z } from "zod";
import { isAllowedCountry } from "./countries";

const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Add a lowercase letter")
  .regex(/[A-Z]/, "Add an uppercase letter")
  .regex(/[0-9]/, "Add a number");

export const registerSchema = z
  .object({
    email: z.string().trim().toLowerCase().email("Enter a valid email"),
    password,
    confirmPassword: z.string(),
    firstName: z.string().trim().min(1, "Required").max(80),
    lastName: z.string().trim().min(1, "Required").max(80),
    phone: z.string().trim().min(5, "Enter a valid phone").max(32),
    dob: z.string().refine((v) => {
      const d = new Date(v);
      if (Number.isNaN(d.getTime())) return false;
      const age = (Date.now() - d.getTime()) / (365.25 * 24 * 3600 * 1000);
      return age >= 18 && age <= 120;
    }, "You must be at least 18"),
    street: z.string().trim().min(1, "Required").max(160),
    city: z.string().trim().min(1, "Required").max(80),
    country: z.string().refine(isAllowedCountry, "Select a valid country"),
    postalCode: z.string().trim().min(1, "Required").max(16),
    terms: z.literal("on", { message: "You must accept the terms" }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});

export const forgotSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
});

export const resetSchema = z
  .object({
    token: z.string().min(1),
    password,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
