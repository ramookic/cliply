import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { schema } from "@/schemas/login-schema";
import login from "@/lib/auth/login";
import { z } from "zod";

export async function POST(req: NextRequest) {
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
