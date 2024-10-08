import { NextResponse } from "next/server";
import { verifyJWT } from "./utils/helpers/authHelpers";
import jwt from "jsonwebtoken";

const unsafeMethods = ["POST", "PUT", "DELETE", "GET"];

export async function middleware(req) {
  const url = new URL(req.url, req.nextUrl.origin); // Skapa ett URL-objekt från req.url och lägg till req.nextUrl.origin
  console.log("Middleware is running", url.pathname);

  if (
    unsafeMethods.includes(req.method) ||
    url.pathname.includes("api/users")
  ) {
    console.log("VERIFY");
    try {
      const bearer = req.headers.get("Authorization") || "";
      const token = bearer.split(" ")?.[1]; // get the token from the Authorization header through optional chaining
      if (!token) {
        throw new Error("no token submitted");
      }

      const jwtPayload = await verifyJWT(token);

      const headers = new Headers(req.headers);
      headers.set("userId", JSON.stringify(jwtPayload.userId));

      return NextResponse.next({ headers: headers });
    } catch (error) {
      return NextResponse.json(
        {
          error: "Unauthorized request",
        },
        { status: 401 }
      );
    }
  }
}

export const config = {
  matcher: [
    "/api/users/",
    "/api/users/:path*",
    //"/api/auth/",
    //"/api/auth/:path*",
    "/api/items/:path*",
  ],
};
