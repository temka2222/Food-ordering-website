import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Insert email" })
    .email({ message: "Please provide a valid email address." }),
  password: z
    .string()
    .min(1, { message: "Insert Password" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
      message: "Password must include at least one letter and one number.",
    }),
});
