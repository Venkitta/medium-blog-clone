import z from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(5)
})