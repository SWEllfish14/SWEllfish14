import { QueryClient } from "@tanstack/react-query";
import { provider, toValue } from "react-ioc";
import { AreeStore } from "../stores/AreeStore";
import { queryClient } from "../utils/utils";
import HomeViewModel from "../ViewModel/HomeViewModel";
import HomeView from "../view/HomeView";
import { GuastiStore } from "../stores/GuastiStore";
import { LampioniStore } from "../stores/LampioniStore";
import { SensoriStore } from "../stores/SensoriStore";
export const Home = provider(AreeStore,GuastiStore,LampioniStore,SensoriStore, [QueryClient, toValue(queryClient)])(
    () => {
      const viewModel = HomeViewModel();
      return <HomeView viewModel={viewModel}></HomeView>;
    }
  );