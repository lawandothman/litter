// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { litterRouter } from "./litter";
import { authRouter } from "./auth";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", litterRouter)
  .merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
