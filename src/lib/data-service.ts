import isAuthenticated from "@/utils/supabase/is-authenticated";
import getAllLinks from "./links/get-all-links";
import getLink from "./links/get-link";
import { PostgrestError } from "@supabase/supabase-js";
import { Tables } from "../../types_db";

/**
 * Fetches all the links associated with the authenticated user.
 * @returns {Promise<data: Tables<"links">[] | null> ; error: PostgrestError | null} A promise that resolves to the user's links or error.
 * @throws {Error} If the user is not authenticated.
 */

export const getUserLinks = async (): Promise<{
  data: Tables<"links">[] | null;
  error: PostgrestError | null;
}> => {
  const user = await isAuthenticated();

  const { data, error } = await getAllLinks({ userId: user.id });

  return { data, error };
};

/**
 * Fetches a link associated with the authenticated user based on linkId.
 * @returns {Promise<data: Tables<"links">[] | null; error: PostgrestError | null>} A promise that resolves to the user's link or error.
 * @throws {Error} If the user is not authenticated.
 */

export const getUserLink = async (
  linkId: number
): Promise<{ data: Tables<"links"> | null; error: PostgrestError | null }> => {
  const user = await isAuthenticated();

  const { data, error } = await getLink({ userId: user.id, linkId });

  return { data, error };
};
