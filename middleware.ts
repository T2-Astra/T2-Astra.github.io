import createMiddleware from "next-intl/middleware";

export default createMiddleware({
   locales: ["en", "nl"],
   defaultLocale: "en",
   localePrefix: "as-needed",
});

export const config = {
   matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
