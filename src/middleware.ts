import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;

    if (token && req.nextUrl.pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname === "/login") return true;

        if (process.env.NODE_ENV === "development") return true;

        if (!token) return false;
        return true;
      },
    },
  },
);

export const config = {
  matcher: [
    "/login",
    "/dashboard",
    "/suppliers/:path",
    "/admin/new-supplier-manager",
  ],
};
