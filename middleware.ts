// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedOrigins = [
  "http://localhost:3000",
  "https://your-frontend-domain.com",
]; // Replace with your allowed origins

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (
    origin &&
    !allowedOrigins.includes(origin) &&
    request.method === "OPTIONS"
  ) {
    return new NextResponse(null, {
      status: 403, // Forbidden
      headers: {
        "Access-Control-Allow-Origin": origin, // Respond with the requested origin
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": "86400", // Cache preflight requests for 24 hours
      },
    });
  }

  const response = NextResponse.next();

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Max-Age", "86400");
  }

  return response;
}

export const config = {
  matcher: "/api/:path*", // Apply middleware to all API routes
};
