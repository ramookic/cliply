import { createClient } from "./supabase/server";

const usedShortCodes = new Set<string>();

/**
 * Checks if a shortcode is already used in the database or cached in memory.
 * @param shortcode The shortcode to check
 * @returns A promise resolving to true if the shortcode exists, false otherwise
 */

export const isShortcodeUsed = async (shortcode: string): Promise<boolean> => {
  const supabase = await createClient();

  if (usedShortCodes.has(shortcode)) return true;

  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("short_code", shortcode)
    .single();

  if (error) {
    throw new Error("Failed to check shortcode.");
  }

  if (data) {
    usedShortCodes.add(shortcode);
    return true;
  }

  return false;
};

/**
 * Generates a random shortcode of a specified length.
 * @param length Number of characters in the shortcode
 * @returns A random alphanumeric shortcode
 */

export const generateRandomShortcode = (length = 6): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Generates a unique shortcode by ensuring it doesn't exist in the database.
 * @param length Number of characters in the shortcode
 * @returns A unique shortcode
 */

export const generateUniqueShortcode = async (length = 6): Promise<string> => {
  let shortcode: string;
  let isUsed = true;

  do {
    shortcode = generateRandomShortcode(length);
    isUsed = await isShortcodeUsed(shortcode);
  } while (isUsed);

  return shortcode;
};
