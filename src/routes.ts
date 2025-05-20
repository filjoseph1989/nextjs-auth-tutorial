/**
 * An array of public routes that do not require authentication.
 * @type {string[]} publicRoutes
 */
export const publicRoutes = ["/"];

/**
 * An array of authentication routes.
 * @type {string[]} authRoutes
 */
export const authRoutes = [
    "/auth/register",
    "/auth/login",
    "/auth/error"
];

/**
 * The prefix for API routes.
 * @type {string} apiPrefix
 */
export const apiPrefix = "/api/auth";

/**
 * The default login redirect URL.
 * @type {string} DEFAULT_LOGIN_REDIRECT
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";