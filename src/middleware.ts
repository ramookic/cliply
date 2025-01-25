import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import getLinkByShortcode from "./lib/links/get-link-by-shortcode";

const forbiddenShortcodes = new Set([
  "api",
  "dashboard",
  "login",
  "register",
  "reset-password",
]);

function isForbiddenShortcode(pathname: string): boolean {
  const [firstSegment] = pathname.split("/").filter(Boolean);
  return forbiddenShortcodes.has(firstSegment);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isForbiddenShortcode(pathname)) {
    return await updateSession(request);
  }

  const shortcode = pathname.slice(1);

  if (
    shortcode &&
    !shortcode.includes("/") &&
    !isForbiddenShortcode(shortcode)
  ) {
    const { data, error } = await getLinkByShortcode(shortcode);

    if (error) {
      return NextResponse.next();
    }

    if (data?.original_url) {
      return NextResponse.redirect(data.original_url);
    }
  }

  return (await updateSession(request)) || NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
