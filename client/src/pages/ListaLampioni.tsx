import { QueryClient } from "@tanstack/react-query";
import { provider, toValue } from "react-ioc";
import { LampioniStore } from "../stores/LampioniStore";
import { queryClient } from "../utils/utils";
import ListaLampioniViewModel  from "../ViewModel/ListaLampioniViewModel";
import ListaLampioniView from "../view/ListaLampioniView";

export const ListaLampioni = provider(LampioniStore, [QueryClient, toValue(queryClient)])(
    () => {
      const viewModel = ListaLampioniViewModel();
      return <ListaLampioniView viewModel={viewModel}></ListaLampioniView>;
    }
  );