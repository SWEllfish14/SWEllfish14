import { QueryClient } from "@tanstack/react-query";
import { provider, toValue } from "react-ioc";
import { AreeViewModel } from "../ViewModel/AreeViewModel";
import { AreeStore } from "../stores/AreeStore";
import AreeView from "../view/AreeView";
import { queryClient } from "../utils/utils";

export const GestioneAree = provider(AreeStore, [QueryClient, toValue(queryClient)])(
    () => {
      const viewModel = AreeViewModel();
      return <AreeView viewModel={viewModel}></AreeView>;
    }
  );