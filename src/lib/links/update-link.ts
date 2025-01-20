import { PostgrestError } from "@supabase/supabase-js";
import { Tables, TablesUpdate } from "../../../types_db";
import { createClient } from "@/utils/supabase/server";
import { isShortcodeUsed } from "@/utils/shortcodes";

type LinkUpdate = TablesUpdate<"links">;

type UpdateLinkProps = {
  userId: string;
  linkId: number;
  originalUrl?: LinkUpdate["original_url"];
  shortcode?: LinkUpdate["short_code"];
  expirationDate?: LinkUpdate["expiration_date"];
};

/**
 * Updates the link.
 * @param {UpdateLinkProps} params - The link data.
 * @returns {Promise<{data: Tables<"links">;error: PostgrestError | null;}>} - A promise that resolves when the link is updated.
 */

const updateLink = async ({
  userId,
  linkId,
  originalUrl,
  shortcode,
  expirationDate,
}: UpdateLinkProps): Promise<{
  data: Tables<"links"> | null;
  error: PostgrestError | null;
}> => {
  const supabase = await createClient();

  if ((!originalUrl && !shortcode && !expirationDate) || !linkId) {
    throw new Error(
      "You need to pass either originalUrl, shortcode or expirationDate"
    );
  }

  const updateData: Partial<LinkUpdate> = {};

  if (originalUrl) updateData.original_url = originalUrl;

  if (shortcode) {
    const isUsed = await isShortcodeUsed(shortcode);

    if (isUsed) {
      throw new Error(
        `The provided shortcode "${shortcode}" is already in use.`
      );
    }

    updateData.short_code = shortcode;
  }

  if (expirationDate) updateData.expiration_date = expirationDate;

  const { data, error } = await supabase
    .from("links")
    .update({ ...updateData })
    .eq("id", linkId)
    .eq("user_id", userId)
    .select()
    .single();

  return { data, error };
};

export default updateLink;
