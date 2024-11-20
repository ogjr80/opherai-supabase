import { z } from "zod";

export const agencyProfileSchema = z.object({
  name: z.string().min(2, "Agency name must be at least 2 characters"),
  type: z.string().min(1, "Please select an agency type"),
  specialization: z.array(z.string()).min(1, "Please select at least one specialization"),
  size: z.string().min(1, "Please select your agency size"),
  website: z.string().url("Please enter a valid website URL"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(2, "Please enter your location"),
  founded: z.string().min(4, "Please enter a valid year"),
  industries: z.array(z.string()).min(1, "Please select at least one industry")
});

export const agencyServicesSchema = z.object({
  recruitmentTypes: z.array(z.string()).min(1, "Select at least one recruitment type"),
  industries: z.array(z.string()).min(1, "Select at least one industry"),
  locations: z.array(z.string()).min(1, "Select at least one location"),
  fees: z.object({
    structure: z.string().min(1, "Fee structure is required"),
    rates: z.string().min(1, "Rates information is required")
  })
});

export const recruiterProfileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
  specialization: z.array(z.string()).min(1, "Select at least one specialization"),
  experience: z.string().min(1, "Experience is required")
});

export const clientPortfolioSchema = z.object({
  currentClients: z.array(z.string()).min(1, "Add at least one client"),
  successMetrics: z.object({
    placements: z.string().min(1, "Number of placements is required"),
    timeToHire: z.string().min(1, "Average time to hire is required"),
    clientRetention: z.string().min(1, "Client retention rate is required")
  })
});
