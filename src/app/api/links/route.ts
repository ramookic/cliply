import createLink from "@/lib/links/create-link";
import getAllLinks from "@/lib/links/get-all-links";
import { createLinkSchema } from "@/schemas/link-schema";
import isAuthenticated from "@/utils/supabase/is-authenticated";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Handles the POST request for creating a new shortened link.
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<NextResponse>} - A promise that resolves with the response object containing either success or error details.
 * @throws {Error} - Throws an error if the user is not authenticated or if there is an issue during the link creation.
 */

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const user = await isAuthenticated();

    const body = await req.json();
    const { originalUrl, shortcode } = createLinkSchema.parse(body);

    if (!originalUrl) throw new Error("You must provide originalUrl!");

    const { data, error } = await createLink({
      userId: user.id,
      originalUrl,
      shortcode,
    });

    if (error) throw new Error(error.message);

    return NextResponse.json(
      { message: "Link created successfully.", data },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: error.errors[0].message,
        },
        { status: 400 }
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json(
      { message: "Something went wrong", errors: errorMessage },
      { status: 500 }
    );
  }
}

/**
 * Handles the GET request for fetching all the links by user id.
 * @returns {Promise<NextResponse>} - A promise that resolves with the response object containing either success or error details.
 * @throws {Error} - Throws an error if the user is not authenticated or if there is an issue during the links fetching.
 */

export async function GET(): Promise<NextResponse> {
  try {
    const user = await isAuthenticated();

    const { data, error } = await getAllLinks({ userId: user.id });

    if (!data || data.length === 0) {
      throw new Error("Links not found.");
    }

    if (error) throw new Error(error.message);

    return NextResponse.json({ message: "Success.", data }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json(
      { message: "Something went wrong", errors: errorMessage },
      { status: 500 }
    );
  }
}
