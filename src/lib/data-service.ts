import isAuthenticated from "@/utils/supabase/is-authenticated";
import getAllLinks from "./links/get-all-links";
import { redirect } from "next/navigation";
import { Tables } from "../../types_db";

/**
 * Fetches all the links associated with the authenticated user.
 * @returns {Promise<Tables<"links">[] | null>} A promise that resolves to the user's links or redirects in case of an error.
 * @throws {Error} If the user is not authenticated or if there is an error fetching the links.
 */

export const getUserLinks = async (): Promise<Tables<"links">[] | null> => {
  const user = await isAuthenticated();

  const { data, error } = await getAllLinks({ userId: user.id });

  if (error) {
    redirect(`/dashboard?error=${error.message}`);
  }

  return data;
};
