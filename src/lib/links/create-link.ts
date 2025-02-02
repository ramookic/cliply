import {
  generateUniqueShortcode,
  isForbiddenShortcode,
  isShortcodeUsed,
} from "@/utils/shortcodes";
import { createClient } from "@/utils/supabase/server";
import { Tables, TablesInsert } from "../../../types_db";
import { PostgrestError } from "@supabase/supabase-js";

type LinkInsert = TablesInsert<"links">;

type CreateLinkProps = {
  userId: string;
  originalUrl: LinkInsert["original_url"];
  shortcode?: LinkInsert["short_code"];
  expirationDate?: LinkInsert["expiration_date"];
};

/**
 * Creates a new shortened link.
 * @param {CreateLinkProps} params - The link data.
 * @returns {Promise<{data: Tables<"links"> | null; error: PostgrestError | null;}>} - A promise that resolves when the link is created.
 * @throws {Error} - Throws an error if the shortcode is already in use or link creation fails.
 */

const createLink = async ({
  userId,
  originalUrl,
  shortcode,
  expirationDate,
}: CreateLinkProps): Promise<{
  data: Tables<"links"> | null;
  error: PostgrestError | null;
}> => {
  const supabase = await createClient();

  if (shortcode) {
    const isUsed = await isShortcodeUsed(shortcode);
    const isForbidden = isForbiddenShortcode(shortcode);
    if (isUsed || isForbidden) {
      throw new Error(
        `The provided shortcode "${shortcode}" is already in use or is forbidden.`
      );
    }
  }

  const code = shortcode || (await generateUniqueShortcode());

  const { data, error } = await supabase
    .from("links")
    .insert({
      user_id: userId,
      original_url: originalUrl,
      short_code: code,
      expiration_date: expirationDate || null,
    })
    .select()
    .single();

  return { data, error };
};

export default createLink;
