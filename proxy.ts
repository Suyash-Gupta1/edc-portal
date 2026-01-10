// proxy.ts (Next.js 16+)

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const config = {
  matcher: ["/admin/:path*"], // protect all /admin routes
};

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded.isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next(); // allow access

  } catch (err) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
