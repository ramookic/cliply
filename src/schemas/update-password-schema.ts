import { z } from "zod";

export const schema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type FormFields = z.infer<typeof schema>;
