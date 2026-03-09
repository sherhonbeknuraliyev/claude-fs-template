import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@shared/../../server/routers/index.js";

export const trpc = createTRPCReact<AppRouter>();

// Default API URL — change for production
// Android emulator: 10.0.2.2, iOS simulator: localhost
export const getApiUrl = () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Constants = require("expo-constants").default;
  const debuggerHost = Constants.expoConfig?.hostUri?.split(":")[0];

  if (debuggerHost) {
    return `http://${debuggerHost}:4000/api/trpc`;
  }

  return "http://localhost:4000/api/trpc";
};
