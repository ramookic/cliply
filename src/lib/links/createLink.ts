import { generateUniqueShortcode, isShortcodeUsed } from "@/utils/shortcodes";
import { createClient } from "@/utils/supabase/server";
import { TablesInsert } from "../../../types_db";

type LinkInsert = TablesInsert<"links">;

type CreateLinkProps = {
  originalUrl: LinkInsert["original_url"];
  shortcode?: LinkInsert["short_code"];
  expirationDate?: LinkInsert["expiration_date"];
};

/**
 * Creates a new shortened link.
 * @param {CreateLinkProps} params - The link data.
 * @returns {Promise<void>} - A promise that resolves when the link is created.
 * @throws {Error} - Throws an error if the shortcode is already in use or link creation fails.
 */

export const createLink = async ({
  originalUrl,
  shortcode,
  expirationDate,
}: CreateLinkProps): Promise<void> => {
  const supabase = await createClient();

  if (shortcode) {
    const isUsed = await isShortcodeUsed(shortcode);
    if (isUsed) {
      throw new Error(
        `The provided shortcode "${shortcode}" is already in use.`
      );
    }
  }

  const code = shortcode || (await generateUniqueShortcode());

  const { error } = await supabase.from("links").insert({
    original_url: originalUrl,
    short_code: code,
    expiration_date: expirationDate,
  });

  if (error) {
    throw new Error("Link creation failed.");
  }
};

export default createLink;
