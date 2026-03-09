import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export async function createContext({ req, res }: CreateExpressContextOptions) {
  // Extract auth token if present
  const token = req.headers.authorization?.split(" ")[1] ?? null;

  return {
    req,
    res,
    token,
    // Add user session here after auth lookup
    user: null as null | { id: string; email: string; role: string },
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
