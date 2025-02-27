import { z } from "zod";

export const schema = z.object({
  shortcode: z
    .string()
    .min(4, { message: "Must contain at least 4 characters" })
    .max(10, { message: "Must contain at most 10 characters" })
    .optional(),
});

export const createLinkSchema = schema.extend({
  originalUrl: z.string().url("Invalid URL format."),
});

export const updateLinkSchema = schema.extend({
  originalUrl: z.string().url("Invalid URL format.").optional(),
});

export type CreateLinkFormFields = z.infer<typeof createLinkSchema>;
export type UpdateLinkFormFields = z.infer<typeof updateLinkSchema>;
