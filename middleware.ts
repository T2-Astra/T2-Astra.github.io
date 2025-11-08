import createMiddleware from "next-intl/middleware";

export default createMiddleware({
   locales: ["en", "nl"],
   defaultLocale: "en",
   localePrefix: "always",
   localeDetection: true,
});

export const config = {
   matcher: ["/", "/(nl|en)/:path*"],
};
