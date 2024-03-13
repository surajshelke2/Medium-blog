import z from "zod";

export const signUpInput = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email().min(6).regex(/^\S+$/), 
  password: z.string().min(6),
});

export const blogPost = z.object({
  title: z.string().min(3).max(20),
  content: z.string().min(10),
});

export const updatePost = z.object({
  title: z.string().min(3).max(20),
  content: z.string().min(10),
  id: z.string(),
});

export type UpdatePost = z.infer<typeof updatePost>;
export type SignupProps = z.infer<typeof signUpInput>;
export type BlogPost = z.infer<typeof blogPost>;

// export interface User {
