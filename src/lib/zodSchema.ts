import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  fPassword: z.string().min(8),
  sPassword: z.string().min(8),
});

export type User = z.infer<typeof loginSchema>;
