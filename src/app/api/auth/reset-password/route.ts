import { APP_URL } from "@/constants/env";
import resetPassword from "@/lib/auth/reset-password";
import { schema } from "@/schemas/reset-password-schema";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/**
 * Handles pasword reset.
 *
 * - Checks if the user is already logged in.
 * - Parses and validates the request body against the resetpassword schema.
 * - Sends an email to user using `resetPassword` function.
 * - Returns appropriate responses based on the outcome.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<NextResponse>} - A JSON response with the result.
 *
 * Status codes:
 * - 200: Success, check your email!.
 * - 400: Validation failed, password reset failed, or user already logged in.
 * - 500: Unexpected server error.
 */

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const supabase = await createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      return NextResponse.json(
        {
          message: "You are already logged in.",
        },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { email } = schema.parse(body);

    const redirectTo = `${APP_URL}/api/auth/update-password`;

    const { error } = await resetPassword(email, redirectTo);

    if (error) {
      return NextResponse.json(
        { message: "Password reset failed", errors: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Success, check your email!",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: error.errors[0].message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
