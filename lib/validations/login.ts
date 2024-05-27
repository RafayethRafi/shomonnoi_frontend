import { z } from "zod";

export const loginSchema = z.object({
  username: z.string({ required_error: "Email is required" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password should be at least 8 characters long",
    }),
});
