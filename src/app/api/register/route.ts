import register from "@/lib/auth/register";
import { schema } from "@/schemas/register-schema";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
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
          errors: error.errors,
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
