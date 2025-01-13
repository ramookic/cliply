import logout from "@/lib/auth/logout";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

/**
 * Handles the logout process for a user.
 *
 * - Checks if the user is currently logged in using Supabase's session.
 * - Logs out the user by calling the `logout` function.
 * - Returns appropriate responses based on the logout result.
 *
 * @returns {Promise<NextResponse>} - A JSON response with the result of the logout process.
 *
 * Status codes:
 * - 200: Logout successful.
 * - 400: User not logged in or logout process failed.
 * - 500: Unexpected server error.
 */

export async function DELETE(): Promise<NextResponse> {
  try {
    const supabase = await createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        {
          message: "You are not logged in.",
        },
        { status: 400 }
      );
    }

    const { error } = await logout();

    if (error) {
      return NextResponse.json(
        { message: "Something went wrong", errors: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Successfully logged out" },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json(
      { message: "Something went wrong", errors: errorMessage },
      { status: 500 }
    );
  }
}
