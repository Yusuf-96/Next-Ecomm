import { authConfig } from "@/config/auth.config";
import NextAuth from "next-auth";

const privateRoute = ["/"];

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  console.log('middleware is called')
  const isLoggedIn = !!req.auth;

  const { nextUrl } = req;

  const isPrivateRoute = privateRoute.includes(nextUrl.pathname);
  const isAuthRoute = nextUrl.pathname.includes("/login");
  const isApiRoute = nextUrl.pathname.includes("/api");

  if (isApiRoute) return;

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL("/", nextUrl));
  }

  if (isAuthRoute && !isLoggedIn) return;

  if (!isLoggedIn && isPrivateRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }
});

export const config = {
  // matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/api|tprc)(.*)"],
  matcher: [
    '/((?!.*\\..*|_next).*)', // Don't run middleware on static files
    '/', // Run middleware on index page
    '/(api|trpc)(.*)', // Run middleware on API routes
  ],
};
