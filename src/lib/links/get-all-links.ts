import { createClient } from "@/utils/supabase/server";
import { Tables } from "../../../types_db";
import { PostgrestError } from "@supabase/supabase-js";

type GetAllLinksProps = {
  userId: string;
};

/**
 * Gets all the links by user id.
 * @param {GetLinkProps} params - The link data.
 * @returns {Promise<{data: Tables<"links">[] | null; error: PostgrestError | null}>} - A promise that resolves when the links are fetched from the db.
 */

const getAllLinks = async ({
  userId,
}: GetAllLinksProps): Promise<{
  data: Tables<"links">[] | null;
  error: PostgrestError | null;
}> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", userId);

  return { data, error };
};

export default getAllLinks;
