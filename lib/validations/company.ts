import { z } from "zod";

export const companyProfileSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  industry: z.string().min(1, "Please select an industry"),
  size: z.string().min(1, "Please select your company size"),
  website: z.string().url("Please enter a valid website URL"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(2, "Please enter your location"),
  founded: z.string().min(4, "Please enter a valid founding year")
});

export const companyCultureSchema = z.object({
  values: z.array(z.string()).min(1, "Please select at least one company value"),
  benefits: z.array(z.string()).min(1, "Please select at least one benefit"),
  workStyle: z.array(z.string()).min(1, "Please select at least one work style")
});

export const companyTeamSchema = z.array(
  z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    role: z.string().min(1, "Role is required"),
    department: z.string().min(1, "Department is required")
  })
).min(1, "At least one team member is required");

export const hiringNeedsSchema = z.object({
  positions: z.array(z.string()).min(1, "Please add at least one open position"),
  departments: z.array(z.string()).min(1, "Please select at least one department"),
  urgency: z.string().min(1, "Please select hiring urgency level"),
  hiringGoals: z.string().min(10, "Please describe your hiring goals")
});