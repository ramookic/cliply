import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import getLinkByShortcode from "./lib/links/get-link-by-shortcode";
import createClick from "./lib/clicks/create-click";
import { UAParser } from "ua-parser-js";

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

    if (error || !data) {
      return NextResponse.next();
    }

    const userAgent = request.headers.get("user-agent") || "";
    const parser = new UAParser(userAgent);
    const browser = parser.getBrowser().name || "Unknown";
    const deviceType = parser.getDevice().type || "Desktop";

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "";

    let country = "Unknown";

    if (ip) {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
        const geoData = await geoRes.json();
        country = geoData.country || "Unknown";
      } catch (geoError) {
        console.error("Error fetching geo data:", geoError);
      }
    }

    const { error: clickError } = await createClick({
      linkId: data.id as number,
      deviceType,
      browser,
      country,
    });

    if (clickError) {
      return NextResponse.next();
    }

    return NextResponse.redirect(data.original_url as string);
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
