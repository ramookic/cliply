import { NextRequest, NextResponse } from "next/server";
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
