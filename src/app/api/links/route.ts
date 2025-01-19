import createLink from "@/lib/links/create-link";
import deleteLink from "@/lib/links/delete-link";
import updateLink from "@/lib/links/update-link";
import { createLinkSchema, updateLinkSchema } from "@/schemas/link-schema";
import isAuthenticated from "@/utils/supabase/is-authenticated";
import { NextRequest, NextResponse } from "next/server";

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
    const { originalUrl, shortcode, expirationDate } =
      createLinkSchema.parse(body);

    if (!originalUrl) throw new Error("You must provide originalUrl!");

    const { data, error } = await createLink({
      userId: user.id,
      originalUrl,
      shortcode,
      expirationDate,
    });

    if (error) throw new Error(error.message);

    return NextResponse.json(
      { message: "Link created successfully.", data },
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

/**
 * Handles the PATCH request for updating link.
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<NextResponse>} - A promise that resolves with the response object containing either success or error details.
 * @throws {Error} - Throws an error if the user is not authenticated or if there is an issue during the link update.
 */

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const user = await isAuthenticated();

    const body = await req.json();
    const { linkId, originalUrl, shortcode, expirationDate } =
      updateLinkSchema.parse(body);

    const { data, error } = await updateLink({
      linkId,
      userId: user.id,
      originalUrl,
      shortcode,
      expirationDate,
    });

    if (error) throw new Error(error.message);

    return NextResponse.json(
      { message: "Link updated successfully.", data },
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

export async function DELETE(req: NextRequest) {
  try {
    const user = await isAuthenticated();

    const body = await req.json();
    const { linkId } = body;

    await deleteLink({ userId: user.id, linkId });

    return NextResponse.json(
      { message: "Link deleted successfully." },
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
