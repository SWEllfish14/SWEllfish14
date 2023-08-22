import { QueryClient } from "@tanstack/react-query";
import { provider, toValue } from "react-ioc";
import { SensoriStore } from "../stores/SensoriStore";
import { queryClient } from "../utils/utils";
import ListaSensoriViewModel  from "../ViewModel/ListaSensoriViewModel";
import ListaSensoriView from "../view/ListaSensoriView";

export const ListaSensori = provider(SensoriStore, [QueryClient, toValue(queryClient)])(
    () => {
      const viewModel = ListaSensoriViewModel();
      return <ListaSensoriView viewModel={viewModel}></ListaSensoriView>;
    }
  );