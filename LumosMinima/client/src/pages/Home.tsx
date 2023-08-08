import { QueryClient } from "@tanstack/react-query";
import { provider, toValue } from "react-ioc";
import { AreeStore } from "../stores/AreeStore";
import { queryClient } from "../utils/utils";
import HomeViewModel from "../ViewModel/HomeViewModel";
import HomeView from "../view/HomeView";
import { GuastiStore } from "../stores/GuastiStore";
import { LampioniStore } from "../stores/LampioniStore";

export const Home = provider(AreeStore,GuastiStore,LampioniStore, [QueryClient, toValue(queryClient)])(
    () => {
      const viewModel = HomeViewModel();
      return <HomeView viewModel={viewModel}></HomeView>;
    }
  );