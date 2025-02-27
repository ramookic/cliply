import {
  generateUniqueShortcode,
  isForbiddenShortcode,
  isShortcodeUsed,
} from "@/utils/shortcodes";
import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { Tables, TablesInsert } from "../../../types_db";

type LinkInsert = TablesInsert<"links">;

type CreateLinkProps = {
  userId: string;
  originalUrl: LinkInsert["original_url"];
  shortcode?: LinkInsert["short_code"];
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
    })
    .select()
    .single();

  return { data, error };
};

export default createLink;
