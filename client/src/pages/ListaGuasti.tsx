import { QueryClient } from "@tanstack/react-query";
import { provider, toValue } from "react-ioc";
import { GuastiStore } from "../stores/GuastiStore";
import { queryClient } from "../utils/utils";
import { ListaGuastiViewModel } from "../ViewModel/ListaGuastiViewModel";
import ListaGuastiView from "../view/ListaGuastiView";

export const ListaGuasti = provider(GuastiStore, [QueryClient, toValue(queryClient)])(
    () => {
      const viewModel = ListaGuastiViewModel();
      return <ListaGuastiView viewModel={viewModel}></ListaGuastiView>;
    }
  );