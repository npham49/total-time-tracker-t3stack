import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { timeRouter } from "./routers/time";
import { sharedRouter } from "./routers/shared";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  time: timeRouter,
  shared: sharedRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
