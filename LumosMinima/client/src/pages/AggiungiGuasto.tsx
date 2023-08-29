import { QueryClient } from "@tanstack/react-query";
import { provider, toValue } from "react-ioc";
import { GuastiStore } from "../stores/GuastiStore";
import { AreeStore } from "../stores/AreeStore";
import { queryClient } from "../utils/utils";
import {AggiungiGuastoViewModel} from "../ViewModel/AggiungiGuastoViewModel";
import AggiungiGuastoView from "../view/AggiungiGuastoView";

export const AggiungiGuasto = provider(GuastiStore,AreeStore, [QueryClient, toValue(queryClient)])(
    () => {
      const viewModel = AggiungiGuastoViewModel();
      return <AggiungiGuastoView viewModel={viewModel}></AggiungiGuastoView>;
    }
  );