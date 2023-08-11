import { QueryClient } from "@tanstack/react-query";
import { provider, toValue } from "react-ioc";
import { AreeStore } from "../stores/AreeStore";
import { queryClient } from "../utils/utils";
import { AreaDetailsViewModel } from "../ViewModel/AreaDetailsViewModel";
import AreaDetailsView from "../view/AreaDetailsView";

export const AreaDetails = provider(AreeStore, [QueryClient, toValue(queryClient)])(
    () => {
      const viewModel = AreaDetailsViewModel();
      return <AreaDetailsView viewModel={viewModel}></AreaDetailsView>;
    }
  );