import { QueryClient } from "@tanstack/react-query";
import { provider, toValue } from "react-ioc";
import { AreeStore } from "../stores/AreeStore";
import { queryClient } from "../utils/utils";
import {ModificaAreaViewModel} from "../ViewModel/ModificaAreaViewModel";
import ModificaAreaView from "../view/ModificaAreaView";
import { useParams } from "react-router-dom";

export const ModificaArea = provider(AreeStore, [QueryClient, toValue(queryClient)])(
    () => {
      const viewModel = ModificaAreaViewModel();
      return <ModificaAreaView viewModel={viewModel}></ModificaAreaView>;
    }
  );