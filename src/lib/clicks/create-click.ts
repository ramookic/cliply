import { PostgrestError } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { Tables, TablesInsert } from "../../../types_db";

type ClickInsert = TablesInsert<"clicks">;

type CreateClickProps = {
  linkId: ClickInsert["link_id"];
  deviceType: ClickInsert["device_type"];
  browser: ClickInsert["browser"];
  country: ClickInsert["country"];
};

/**
 * Creates new click.
 * @param {CreateClickProps} params - The click data.
 * @returns {Promise<{data: Tables<"clicks"> | null; error: PostgrestError | null;}>} - A promise that resolves when the click is created.
 */

const createClick = async ({
  linkId,
  deviceType,
  browser,
  country,
}: CreateClickProps): Promise<{
  data: Tables<"clicks"> | null;
  error: PostgrestError | null;
}> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("clicks").insert({
    link_id: linkId,
    device_type: deviceType,
    browser,
    country,
  });

  return { data, error };
};

export default createClick;
