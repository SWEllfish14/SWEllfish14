import { QueryClient } from "@tanstack/react-query";
import { provider, toValue } from "react-ioc";
import { AreeStore } from "../stores/AreeStore";
import { queryClient } from "../utils/utils";
import {AggiungiAreaViewModel} from "../ViewModel/AggiungiAreaViewModel";
import AggiungiAreaView from "../view/AggiungiAreaView";

export const AggiungiArea = provider(AreeStore, [QueryClient, toValue(queryClient)])(
    () => {
      const viewModel = AggiungiAreaViewModel();
      return <AggiungiAreaView viewModel={viewModel}></AggiungiAreaView>;
    }
  );