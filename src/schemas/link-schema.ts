import { z } from "zod";

export const schema = z.object({
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

export const createLinkSchema = schema.extend({
  originalUrl: z.string().url("Invalid URL format."),
});

export const updateLinkSchema = schema.extend({
  originalUrl: z.string().url("Invalid URL format.").optional(),
});

export type UpdateLinkFormFields = z.infer<typeof updateLinkSchema>;
