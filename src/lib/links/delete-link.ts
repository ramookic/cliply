import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

type DeleteLinkProps = {
  userId: string;
  linkId: number;
};

/**
 * Deletes a link.
 * @param {DeleteLinkProps} params - The link and user data.
 * @returns {Promise<{error: PostgrestError | null}>} - Apromise that resolves when the link is deleted.
 */

const deleteLink = async ({
  userId,
  linkId,
}: DeleteLinkProps): Promise<{ error: PostgrestError | null }> => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("links")
    .delete()
    .eq("id", linkId)
    .eq("user_id", userId);

  return { error };
};

export default deleteLink;
