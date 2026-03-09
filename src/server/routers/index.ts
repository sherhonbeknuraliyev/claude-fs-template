import { router } from "../trpc/trpc.js";
import { userRouter } from "./user.router.js";

export const appRouter = router({
  user: userRouter,
});

// Export type for client usage (this is the magic of tRPC!)
export type AppRouter = typeof appRouter;
