import { QueryClient } from "@tanstack/react-query";
import { provider, toValue } from "react-ioc";
import { AreeStore } from "../stores/AreeStore";
import { queryClient } from "../utils/utils";
import {AggiungiSensoreViewModel} from "../ViewModel/AggiungiSensoreViewModel";
import AggiungiSensoreView from "../view/AggiungiSensoreView";

export const AggiungiSensore = provider(AreeStore, [QueryClient, toValue(queryClient)])(
    () => {
      const viewModel = AggiungiSensoreViewModel();
      return <AggiungiSensoreView viewModel={viewModel}></AggiungiSensoreView>;
    }
  );