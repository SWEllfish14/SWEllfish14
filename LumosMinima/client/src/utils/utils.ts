import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchInterval: 6000,
        refetchOnWindowFocus: true,
        retry: false,
        staleTime: Infinity,
      },
    },
  });

  