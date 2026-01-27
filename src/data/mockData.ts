import { TEAM_LINKS } from "@/constants/links";
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
    targetAmount: 25000,
    currentAmount: 0,
  },
  {
    id: 2,
    title: "Community Centered Distribution Centers",
    description:
      "Building distribution centers where community members can fetch clean water from protected springs.",
    category: "Distribution",
    location: "Makueni, Kenya",
    imageUrl: "/piping.jpeg",
    targetAmount: 5000,
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
    targetAmount: 15000,
    currentAmount: 0,
  },
  // {
  //   id: 4,
  //   title: "Irrigation System",
  //   description:
  //     "Developing sustainable irrigation systems to support agricultural productivity in farming communities.",
  //   category: "Irrigation",
  //   location: "Makueni, Kenya",
  //   imageUrl: "/irrigation.jpeg",
  //   targetAmount: 35000,
  //   currentAmount: 0,
  // },
];

export const mockTeam: TeamMember[] = [
  {
    id: 1,
    name: "Agnes Ndanu",
    role: "Founder & Executive Director",
    bio: "Leads the vision, strategy, and partnerships to deliver sustainable, community-centered water access across rural Kenya.",
    imageUrl: "/agnes.jpeg",
    email: TEAM_LINKS.agnes.email,
    phone: TEAM_LINKS.agnes.phone,
    linkedin: TEAM_LINKS.agnes.linkedin,
  },
  {
    id: 2,
    name: "Yvonne Mwikali",
    role: "Technical Lead & Web Manager",
    bio: "Technical expert managing website development, social media presence, and digital infrastructure for Maji Safi Solutions.",
    imageUrl: "/yvonne.jpeg",
    email: TEAM_LINKS.yvonne.email,
    phone: TEAM_LINKS.yvonne.phone,
    linkedin: TEAM_LINKS.yvonne.linkedin,
    gmail: TEAM_LINKS.yvonne.gmail,
  },
  {
    id: 3,
    name: "Nelly Karimi",
    role: "Program Director",
    bio: "Oversees service delivery and mission implementation so projects stay on-scope and on-impact.",
    imageUrl: "/nelly.jpeg",
    email: TEAM_LINKS.nelly.email,
    phone: TEAM_LINKS.nelly.phone,
    linkedin: TEAM_LINKS.nelly.linkedin,
  },
  {
    id: 4,
    name: "Ansila Bahati",
    role: "Operations & Field Manager",
    bio: "Coordinates communities, contractors, and authorities to deliver compliant, efficient, and sustainable borehole builds.",
    imageUrl: "/ansila.jpeg",
    email: TEAM_LINKS.ansila.email,
    phone: TEAM_LINKS.ansila.phone,
    facebook: TEAM_LINKS.ansila.facebook,
  },
];
