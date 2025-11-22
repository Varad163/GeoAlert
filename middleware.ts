import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {},
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // If admin pages - only allow ADMIN
        if (path.startsWith("/admin")) {
          return token?.role === "ADMIN";
        }

        // If user pages - allow authenticated users
        if (path.startsWith("/dashboard")) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*"
  ],
};
