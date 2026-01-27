import { z } from "zod";

export const projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  location: z.string(),
  imageUrl: z.string().url(),
  targetAmount: z.number().positive(),
  currentAmount: z.number().nonnegative(),
});

export type Project = z.infer<typeof projectSchema>;

export const teamMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  role: z.string(),
  bio: z.string(),
  imageUrl: z.string().url(),
  email: z.string().optional(),
  phone: z.string().optional(),
  linkedin: z.string().optional(),
  facebook: z.string().optional(),
  gmail: z.string().optional(),
});

export type TeamMember = z.infer<typeof teamMemberSchema>;

export const insertDonationSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Please provide a valid email"),
  phone: z.string().trim().optional(),
  projectId: z.number().optional(),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more about your donation intent")
    .max(500, "Message is too long"),
});

export type InsertDonation = z.infer<typeof insertDonationSchema>;

export const insertInquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Please provide a valid email"),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more about your inquiry"),
  type: z.enum(["Volunteer", "Partner", "General"]),
});

export type InsertInquiry = z.infer<typeof insertInquirySchema>;

export const mockProjects: Project[] = [
  {
    id: 1,
    title: "Solar-Powered Borehole",
    description:
      "Drilling a 180m borehole with a 15kW solar pump to serve three villages and two primary schools.",
    category: "Borehole",
    location: "Makueni, Kenya",
    imageUrl: "/borehole.jpeg",
    targetAmount: 45000,
    currentAmount: 0,
  },
  {
    id: 2,
    title: "Household Piping Network",
    description:
      "Laying piping infrastructure from protected springs to reach households with safe water access.",
    category: "Piping",
    location: "Makueni, Kenya",
    imageUrl: "/piping.jpeg",
    targetAmount: 52000,
    currentAmount: 0,
  },
  {
    id: 3,
    title: "School Water Access",
    description:
      "Installing water systems and filtration for schools to ensure students have access to clean water.",
    category: "School",
    location: "Makueni, Kenya",
    imageUrl: "/school.jpeg",
    targetAmount: 18000,
    currentAmount: 0,
  },
  {
    id: 4,
    title: "Irrigation System",
    description:
      "Developing sustainable irrigation systems to support agricultural productivity in farming communities.",
    category: "Irrigation",
    location: "Makueni, Kenya",
    imageUrl: "/irrigation.jpeg",
    targetAmount: 35000,
    currentAmount: 0,
  },
];

export const mockTeam: TeamMember[] = [
  {
    id: 1,
    name: "Agnes Ndanu",
    role: "Founder & Executive Director",
    bio: "Leads the vision, strategy, and partnerships to deliver sustainable, community-centered water access across rural Kenya.",
    imageUrl: "/agnes.jpeg",
    email: "akaumbulu@colgate.edu",
    phone: "+1 (315) 864-0795",
    linkedin: "https://www.linkedin.com/in/agnes-kaumbulu",
  },
  {
    id: 2,
    name: "Yvonne Mwikali",
    role: "Technical Lead & Web Manager",
    bio: "Technical expert managing website development, social media presence, and digital infrastructure for Maji Safi Solutions.",
    imageUrl: "/yvonne.jpeg",
    email: "yvonnemwikali162@gmail.com",
    phone: "+254796808579",
    linkedin: "https://www.linkedin.com/in/yvonne-mwikali/",
    gmail: "yvonnemwikali162@gmail.com",
  },
  {
    id: 3,
    name: "Nelly",
    role: "Program Director",
    bio: "Oversees service delivery and mission implementation so projects stay on-scope and on-impact.",
    imageUrl: "/nelly.jpeg",
    email: "nellyk@middlebury.edu",
    phone: "+1 (802) 610-4092",
    linkedin: "https://www.linkedin.com/in/nelly-karimi-74086327b",
  },
  {
    id: 4,
    name: "Ansila Bahati",
    role: "Operations & Field Manager",
    bio: "Coordinates communities, contractors, and authorities to deliver compliant, efficient, and sustainable borehole builds.",
    imageUrl: "/ansila.jpeg",
    email: "ansilabahati1@gmail.edu",
    phone: "+254 725 001967",
    facebook: "https://www.facebook.com/ansila.kinyili/",
  },
];
