import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchInterval: 1000,
        refetchOnWindowFocus: true,
        retry: false,
        staleTime: Infinity,
      },
    },
  });

  