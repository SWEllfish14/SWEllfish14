import { QueryClient } from "@tanstack/react-query";
import { provider, toValue } from "react-ioc";
import { AreeStore } from "../stores/AreeStore";
import { queryClient } from "../utils/utils";
import { AreaDetailsViewModel } from "../ViewModel/AreaDetailsViewModel";
import AreaDetailsView from "../view/AreaDetailsView";
import { LampioniStore } from "../stores/LampioniStore";
import { GuastiStore } from "../stores/GuastiStore";
import { GuastoDetailsViewModel } from "../ViewModel/GuastoDetailsViewModel";
import GuastoDetailsView from "../view/GuastoDetailsView";

export const GuastoDetails = provider(GuastiStore,LampioniStore, [QueryClient, toValue(queryClient)])(
    () => {
      const viewModel = GuastoDetailsViewModel();
      return <GuastoDetailsView viewModel={viewModel}></GuastoDetailsView>;
    }
  );