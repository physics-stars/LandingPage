// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { get } from "@vercel/edge-config";
import crypto from "crypto";

function sign(value: string) {
  return crypto
    .createHmac("sha256", process.env.INTERNAL_PAGE_SECRET || "my_super_secret_key")
    .update(value)
    .digest("hex");
}

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  
  try {
    if (pathname === "/error") {
      const sig = url.searchParams.get("sig");
      const token = url.searchParams.get("token");

      if (!sig || !token || sign(token) !== sig) {
        url.pathname = "/404";
        return NextResponse.rewrite(url);
      }

      return NextResponse.next();
    }

    const [temporarilyRaw, maintenanceRaw] = await Promise.all([
      get("temporarily-unavailable"),
      get("maintenance"),
    ]);

    const temporarilyUnavailable = Boolean(temporarilyRaw);
    const maintenanceMode = Boolean(maintenanceRaw);

    if (!temporarilyUnavailable && !maintenanceMode) {
      if (pathname === "/temporarily-unavailable" || pathname === "/maintenance") {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.next();
    }

    if (temporarilyUnavailable && pathname !== "/temporarily-unavailable") {
      return NextResponse.redirect(new URL("/temporarily-unavailable", request.url));
    }

    if (maintenanceMode && !temporarilyUnavailable && pathname !== "/maintenance") {
      return NextResponse.redirect(new URL("/maintenance", request.url));
    }

    return NextResponse.next();
  } catch {
    const token = process.env.INTERNAL_TOKEN || "internal_error_token";
    const sig = sign(token);

    url.pathname = "/error";
    url.searchParams.set("token", token);
    url.searchParams.set("sig", sig);

    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:css|js|png|jpg|jpeg|ico|svg|xml|txt|woff|woff2|eot|ttf|otf|json)$).*)",
    "/api/(.*)",
  ],
};
