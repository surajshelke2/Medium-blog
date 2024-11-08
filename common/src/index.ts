import z from "zod";

export const signUpInput = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
});

export const signInInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const blogPost = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  description: z.string().min(5).max(200),
});

export const updatePost = z.object({
  title: z.string().min(3).max(20),
  content: z.string().min(10),
  id: z.string(),
});

export type SignInProps = z.infer<typeof signInInput>;
export type UpdatePost = z.infer<typeof updatePost>;
export type SignupProps = z.infer<typeof signUpInput>;
export type BlogPost = z.infer<typeof blogPost>;

// export interface User {
