import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { provider, toValue, useInstance } from "react-ioc";

import { AreeViewModel } from "./ViewModel/AreeViewModel";
import { AreaDetailsViewModel} from "./ViewModel/AreaDetailsViewModel";
import { IAreeViewModel } from "./ViewModel/AreeViewModel";
import { AreeStore } from "./stores/AreeStore";
import AreeView from "./view/AreeView";
import AreaDetailsView from "./view/AreaDetailsView";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 6000,
      refetchOnWindowFocus: true,
      retry: false,
      staleTime: Infinity,
    },
  },
});

export const App = provider(AreeStore, [QueryClient, toValue(queryClient)])(
  () => {
    const viewModel = AreeViewModel();
    return <AreeView viewModel={viewModel}></AreeView>;
  }
);
