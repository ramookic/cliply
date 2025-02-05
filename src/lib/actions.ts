"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import register from "./auth/register";
import login from "./auth/login";
import logout from "./auth/logout";
import isAuthenticated from "@/utils/supabase/is-authenticated";
import createLink from "./links/create-link";
import { Tables } from "../../types_db";
import deleteLink from "./links/delete-link";
import updateLink from "./links/update-link";
import resetPassword from "./auth/reset-password";
import { headers } from "next/headers";

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

/**
 * Updates a link.
 * @returns {Promise<void>} - A promise that resolves when the link update is complete.
 */

export const updateLinkAction = async (
  formData: FormData
): Promise<Tables<"links"> | null> => {
  const user = await isAuthenticated();

  const linkId = formData.get("linkId") as string;
  const originalUrl = formData.get("originalUrl") as string;
  const shortcode = formData.get("shortcode") as string;
  const expirationDate = formData.get("expirationDate") as string;

  const { data, error } = await updateLink({
    linkId: parseInt(linkId),
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

/**
 * Deletes a link.
 */

export const deleteLinkAction = async (linkId: number) => {
  const user = await isAuthenticated();

  const { error } = await deleteLink({ userId: user.id, linkId });

  if (error) {
    redirect(`/dashboard?error=${error.message}`);
  }
};

/**
 * Sends an email to user with password reset link.
 */

export const resetPasswordAction = async (formData: FormData) => {
  const email = formData.get("email") as string;

  const reqHeaders = await headers();

  const host = reqHeaders.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";

  const redirectTo = `${protocol}://${host}/update-password`;

  const { error } = await resetPassword(email, redirectTo);

  if (error) {
    redirect(`/reset-password?error=${error.message}`);
  }
};
