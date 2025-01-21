"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import register from "./auth/register";
import login from "./auth/login";
import logout from "./auth/logout";
import isAuthenticated from "@/utils/supabase/is-authenticated";
import createLink from "./links/create-link";
import { Tables } from "../../types_db";

/**
 * Registers a user from the form data.
 * @param {FormData} formData - The form data from the registration form.
 * @returns {Promise<void>} - A promise that resolves when the registration process is complete.
 */

export const registerAction = async (formData: FormData): Promise<void> => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await register({ name, email, password });

  if (error) {
    redirect(`/register?error=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
};

/**
 * Logs in a user from the form data.
 * @param {FormData} formData - The form data from the login form.
 * @returns {Promise<void>} - A promise that resolves when the login process is complete.
 */

export const loginAction = async (formData: FormData): Promise<void> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await login({ email, password });

  if (error) {
    redirect(`/login?error=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
};

/**
 * Logs out the current user.
 * @returns {Promise<void>} - A promise that resolves when the logout process is complete.
 */

export const logoutAction = async (): Promise<void> => {
  const { error } = await logout();

  if (error) {
    redirect(`/dashboard?error=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/login");
};

/**
 * Creates new link.
 * @returns {Promise<void>} - A promise that resolves when the link creation process is complete.
 */

export const createLinkAction = async (
  formData: FormData
): Promise<Tables<"links"> | null> => {
  const user = await isAuthenticated();

  const originalUrl = formData.get("originalUrl") as string;
  const shortcode = formData.get("shortcode") as string;
  const expirationDate = formData.get("expirationDate") as string;

  const { data, error } = await createLink({
    originalUrl,
    shortcode,
    expirationDate,
    userId: user.id,
  });

  if (error) {
    redirect(`/dashboard?error=${error.message}`);
  }

  return data;
};
