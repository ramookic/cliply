import deleteLink from "@/lib/links/delete-link";
import getLink from "@/lib/links/get-link";
import updateLink from "@/lib/links/update-link";
import { updateLinkSchema } from "@/schemas/link-schema";
import isAuthenticated from "@/utils/supabase/is-authenticated";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Handles the PATCH request for updating a link.
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<NextResponse>} - A promise that resolves with the response object containing either success or error details.
 * @throws {Error} - Throws an error if the user is not authenticated or not.
 */

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const user = await isAuthenticated();

    const body = await req.json();
    const { originalUrl, shortcode, expirationDate } =
      updateLinkSchema.parse(body);

    const linkId = parseInt((await params).id);

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
 * Handles the DELETE request for deleting a link.
 * @param {NextRequest} _req - The incoming request object.
 * @returns {Promise<NextResponse>} - A promise that resolves with the response object containing either success or error details.
 * @throws {Error} - Throws an error if the user is not authenticated or not.
 */

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const user = await isAuthenticated();

    const linkId = parseInt((await params).id);

    const { error } = await deleteLink({ userId: user.id, linkId });

    if (error) throw new Error(error.message);

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

/**
 * Handles the GET request fetching the link..
 * @param {NextRequest} _req - The incoming request object.
 * @returns {Promise<NextResponse>} - A promise that resolves with the response object containing either success or error details.
 * @throws {Error} - Throws an error if the user is not authenticated or not.
 */

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const user = await isAuthenticated();

    const linkId = parseInt((await params).id);

    const { data, error } = await getLink({ userId: user.id, linkId });

    if (error) throw new Error(error.message);

    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json(
      { message: "Something went wrong", errors: errorMessage },
      { status: 500 }
    );
  }
}
