import { createClient } from "@/utils/supabase/server";
import { Tables } from "../../../types_db";
import { PostgrestError } from "@supabase/supabase-js";

type GetLinkProps = {
  userId: string;
  linkId: number;
};

/**
 * Gets the link by user id and link id.
 * @param {GetLinkProps} params - The link data.
 * @returns {Promise<{data: Tables<"links"> | null; error: PostgrestError | null}>} - A promise that resolves when the link is fetched from the db.
 */

const getLink = async ({
  userId,
  linkId,
}: GetLinkProps): Promise<{
  data: Tables<"links"> | null;
  error: PostgrestError | null;
}> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("id", linkId)
    .eq("user_id", userId)
    .single();

  return { data, error };
};

export default getLink;
