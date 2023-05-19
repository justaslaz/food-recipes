import { z } from "zod";

/**
 * Specify your server-side environment variables schema here. This way you can ensure the app
 * isn't built with invalid env vars.
 */

export const serverSchema = z.object({
  DATABASE_URL: z.string().url().optional(),
  CLERK_SECRET_KEY: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]),
});

/**
 * Specify your client-side environment variables schema here. This way you can ensure the app
 * isn't built with invalid env vars. To expose them to the client, prefix them with
 * `NEXT_PUBLIC_`.
 */

export const clientSchema = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
 * middlewares) or client-side so we need to destruct manually.
 */

export const serverEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  NODE_ENV: process.env.NODE_ENV,
};

export const clientEnv = {
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
};
