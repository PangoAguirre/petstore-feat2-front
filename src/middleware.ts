import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

function isAuthRelated(path: string) {
  return ["/login", "/signup", "/recover-password"].some((p) => p === path);
}

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;

    if (token && isAuthRelated(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (isAuthRelated(req.nextUrl.pathname)) return true;
        if (!token) return false;
        return true;
      },
    },
  },
);

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/recover-password",
    "/dashboard",
    "/suppliers/:path",
    "/admin/new-supplier-manager",
  ],
};
