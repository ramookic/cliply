import { z } from "zod";

export const schema = z.object({
  originalUrl: z.string().url("Invalid URL format."),
  shortcode: z.string().min(4).max(10).optional(),
  expirationDate: z
    .string()
    .refine(
      (val) => {
        return !val || !isNaN(Date.parse(val));
      },
      {
        message: "Invalid expiration date format.",
      }
    )
    .optional(),
});
