import { NextRequest, NextResponse } from "next/server";
import getLinkByShortcode from "@/lib/links/get-link-by-shortcode";
import createClick from "@/lib/clicks/create-click";
import { UAParser } from "ua-parser-js";
import { notFound } from "next/navigation";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const shortcode = url.searchParams.get("shortcode");

  const isApiRequest =
    req.headers.get("accept")?.includes("application/json") ||
    url.searchParams.get("fromApi") === "true";

  if (!shortcode || typeof shortcode !== "string") {
    return isApiRequest
      ? NextResponse.json({ error: "Invalid shortcode" }, { status: 400 })
      : NextResponse.redirect(new URL("/not-found", req.url));
  }

  const { data, error } = await getLinkByShortcode(shortcode);

  if (error || !data) {
    return NextResponse.redirect(notFound());
  }

  const userAgent = req.headers.get("user-agent") || "";
  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser().name || "Unknown";
  const deviceType = parser.getDevice().type || "Desktop";

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "Unknown";

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

  await createClick({
    linkId: data.id as number,
    deviceType,
    browser,
    country,
  });

  return NextResponse.redirect(data.original_url as string, { status: 301 });
}
