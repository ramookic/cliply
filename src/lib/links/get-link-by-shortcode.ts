import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { Tables } from "../../../types_db";

/**
 * Gets the link by shortcode.
 * @returns {Promise<{data: Partial<Tables<"links">> | null;error: PostgrestError | null;}>} - A promise that resolves when the link is fetched from the db.
 */

const getLinkByShortcode = async (
  shortcode: string
): Promise<{
  data: Partial<Tables<"links">> | null;
  error: PostgrestError | null;
}> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("links")
    .select("original_url, short_code")
    .eq("short_code", shortcode)
    .single();

  return { data, error };
};

export default getLinkByShortcode;
