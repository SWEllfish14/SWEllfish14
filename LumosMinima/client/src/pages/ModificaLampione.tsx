import { QueryClient } from "@tanstack/react-query";
import { provider, toValue } from "react-ioc";
import { LampioniStore } from "../stores/LampioniStore";
import {AreeStore} from "../stores/AreeStore";
import { queryClient } from "../utils/utils";
import {ModificaLampioneViewModel} from "../ViewModel/ModificaLampioneViewModel";
import ModificaLampioneView from "../view/ModificaLampioneView";
import { useParams } from "react-router-dom";

export const ModificaLampione = provider(LampioniStore,AreeStore, [QueryClient, toValue(queryClient)])(
    () => {
      const viewModel = ModificaLampioneViewModel();
      return <ModificaLampioneView viewModel={viewModel}></ModificaLampioneView>;
    }
  );