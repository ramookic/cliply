import logout from "@/lib/auth/logout";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
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
