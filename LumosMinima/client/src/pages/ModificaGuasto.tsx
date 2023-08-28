import { QueryClient } from "@tanstack/react-query";
import { provider, toValue } from "react-ioc";
import { GuastiStore } from "../stores/GuastiStore";
import { queryClient } from "../utils/utils";
import {ModificaGuastoViewModel} from "../ViewModel/ModificaGuastoViewModel";
import ModificaGuastoView from "../view/ModificaGuastoView";

export const ModificaGuasto = provider(GuastiStore, [QueryClient, toValue(queryClient)])(
    () => {
      const viewModel = ModificaGuastoViewModel();
      return <ModificaGuastoView viewModel={viewModel}></ModificaGuastoView>;
    }
  );