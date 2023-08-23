import { QueryClient } from "@tanstack/react-query";
import { provider, toValue } from "react-ioc";
import { AreeStore } from "../stores/AreeStore";
import { queryClient } from "../utils/utils";
import {AggiungiSensoreViewModel} from "../ViewModel/AggiungiSensoreViewModel";
import AggiungiSensoreView from "../view/AggiungiSensoreView";
import { SensoriStore } from "../stores/SensoriStore";

export const AggiungiSensore = provider(AreeStore,SensoriStore, [QueryClient, toValue(queryClient)])(
    () => {
      const viewModel = AggiungiSensoreViewModel();
      return <AggiungiSensoreView viewModel={viewModel}></AggiungiSensoreView>;
    }
  );