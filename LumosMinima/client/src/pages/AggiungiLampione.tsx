import { QueryClient } from "@tanstack/react-query";
import { provider, toValue } from "react-ioc";
import { AreeStore } from "../stores/AreeStore";
import { queryClient } from "../utils/utils";
import {AggiungiLampioneViewModel} from "../ViewModel/AggiungiLampioneViewModel";
import AggiungiLampioneView from "../view/AggiungiLampioneView";

export const AggiungiLampione = provider(AreeStore, [QueryClient, toValue(queryClient)])(
    () => {
      const viewModel = AggiungiLampioneViewModel();
      return <AggiungiLampioneView viewModel={viewModel}></AggiungiLampioneView>;
    }
  );