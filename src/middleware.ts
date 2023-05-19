import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  ignoredRoutes: [],
  publicRoutes: [
    "/",
    "/recipes",
    "/recipes/(.*)",
    "/sign-in",
    "/sign-up",
    "/api/trpc/(.*)",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
