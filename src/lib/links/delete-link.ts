import { createClient } from "@/utils/supabase/server";

type DeleteLinkProps = {
  userId: string;
  linkId: number;
};

/**
 * Deletes a link.
 * @param {DeleteLinkProps} params - The link and user data.
 * @returns {Promise<void>} - Apromise that resolves when the link is deleted.
 * @throws {Error} - Throws an error if the link is not deleted.
 */

const deleteLink = async ({
  userId,
  linkId,
}: DeleteLinkProps): Promise<void> => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("links")
    .delete()
    .eq("id", linkId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Failed to delete link: ${error.message}`);
  }
};

export default deleteLink;
