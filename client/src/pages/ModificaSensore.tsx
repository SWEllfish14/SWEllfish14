import { QueryClient } from "@tanstack/react-query";
import { provider, toValue } from "react-ioc";
import { SensoriStore } from "../stores/SensoriStore";
import { queryClient } from "../utils/utils";
import {ModificaSensoreViewModel} from "../ViewModel/ModificaSensoreViewModel";
import ModificaSensoreView from "../view/ModificaSensoreView";
import { useParams } from "react-router-dom";

export const ModificaSensore = provider(SensoriStore, [QueryClient, toValue(queryClient)])(
    () => {
      const viewModel = ModificaSensoreViewModel();
      return <ModificaSensoreView viewModel={viewModel}></ModificaSensoreView>;
    }
  );