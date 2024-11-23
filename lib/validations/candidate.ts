import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  location: z.string().min(2, "Location is required"),
  about: z.string().min(100, "Please provide at least 100 characters about yourself"),
  linkedIn: z.string().url().optional(),
  github: z.string().url().optional(),
  portfolio: z.string().url().optional()
});

export const educationSchema = z.array(z.object({
  institution: z.string().min(2, "Institution name is required"),
  degree: z.string().min(2, "Degree is required"),
  fieldOfStudy: z.string().min(2, "Field of study is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  grade: z.string().optional()
})).min(1, "At least one education entry is required");

export const experienceSchema = z.array(z.object({
  company: z.string().min(2, "Company name is required"),
  position: z.string().min(2, "Position is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  description: z.string().min(50, "Please provide at least 50 characters about your role"),
  achievements: z.array(z.string())
    .min(1, "Please add at least one achievement")
    .max(5, "Maximum 5 achievements allowed")
}));

export const projectSchema = z.array(z.object({
  name: z.string().min(2, "Project name is required"),
  description: z.string().min(50, "Please provide at least 50 characters about your project"),
  technologies: z.array(z.string()).min(1, "Please add at least one technology"),
  link: z.string().url().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required")
}));

export const skillSchema = z.array(z.object({
  name: z.string().min(2, "Skill name is required"),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
  yearsOfExperience: z.number().min(0, "Years of experience must be 0 or greater")
})).min(1, "Please add at least one skill");