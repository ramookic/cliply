import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import getLinkByShortcode from "./lib/links/get-link-by-shortcode";
import { isForbiddenShortcode } from "./utils/shortcodes";

/**
 * Middleware function for handling URL routing, redirection, and session management.
 *
 * - Redirects the user to the login page if they access the root (`/`).
 * - Validates if a given shortcode exists in the database and redirects or rewrites as necessary.
 * - Updates session information for authenticated users.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} - The response to send back to the client, which could include redirection, session updates, or next middleware handling.
 */

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isForbiddenShortcode(pathname)) {
    return await updateSession(request);
  }

  const code = pathname.slice(1);

  const { data, error } = await getLinkByShortcode(code);

  if (!data || error) {
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }

  const { short_code: shortcode } = data;

  if (
    shortcode &&
    !shortcode.includes("/") &&
    !isForbiddenShortcode(shortcode)
  ) {
    const sessionResponse = await updateSession(request);

    const redirectResponse = NextResponse.redirect(
      new URL(`/api/redirect?shortcode=${shortcode}`, request.url)
    );

    sessionResponse?.headers.forEach((value, key) => {
      redirectResponse.headers.set(key, value);
    });

    return redirectResponse;
  }

  return (await updateSession(request)) || NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
