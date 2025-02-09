import updatePassword from "@/lib/auth/update-password";
import { schema } from "@/schemas/update-password-schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/**
 * Handles password update.
 *
 * - Checks if the provided code is valid.
 * - Exchanges the authorization code for a session.
 * - Updates the user's password in Supabase.
 * - Returns appropriate responses based on the outcome.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<NextResponse>} - A JSON response with the result.
 *
 * Status codes:
 * - 200: Password updated successfully.
 * - 400: Invalid or expired code, validation failed, or password update failed.
 * - 500: Unexpected server error.
 */

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    const { password } = schema.parse(body);

    if (!code) {
      return NextResponse.json(
        { message: "Code is missing." },
        { status: 400 }
      );
    }

    const { error: updateError } = await updatePassword(code, password);

    if (updateError) {
      return NextResponse.json(
        { message: "Failed to update password.", errors: updateError.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Password updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation failed", errors: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
