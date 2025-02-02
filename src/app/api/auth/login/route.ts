import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { schema } from "@/schemas/login-schema";
import login from "@/lib/auth/login";
import { z } from "zod";

/**
 * Handles the login process for a user.
 *
 * - Validates the request body using Zod.
 * - Checks if the user is already logged in using Supabase's session.
 * - Attempts to log in the user with the provided credentials.
 *
 * @param {NextRequest} req - The incoming HTTP request.
 * @returns {Promise<NextResponse>} - A JSON response with the result of the login process.
 *
 * Status codes:
 * - 200: Login successful.
 * - 400: Validation failed, already logged in, or login failed.
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
    const { email, password } = schema.parse(body);

    const { error } = await login({ email, password });

    if (error) {
      return NextResponse.json(
        { message: "Login failed", errors: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Logged in successfully!",
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
