import register from "@/lib/auth/register";
import { schema } from "@/schemas/register-schema";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/**
 * Handles user registration.
 *
 * - Checks if the user is already logged in to prevent multiple sessions.
 * - Parses and validates the request body against the registration schema.
 * - Registers a new user using the `register` function.
 * - Returns appropriate responses based on the outcome.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<NextResponse>} - A JSON response with the registration result.
 *
 * Status codes:
 * - 200: User registered successfully.
 * - 400: Validation failed, registration failed, or user already logged in.
 * - 500: Unexpected server error.
 */

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Check if the user is already logged in
    const supabase = await createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      return NextResponse.json(
        {
          message:
            "You are already logged in. Please log out before registering a new account.",
        },
        { status: 400 }
      );
    }

    // Parse and validate the request body
    const body = await req.json();
    const { name, email, password } = schema.parse(body);

    const { error } = await register({ name, email, password });

    if (error) {
      return NextResponse.json(
        { message: "Registration failed", errors: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "User registered successfully!",
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
