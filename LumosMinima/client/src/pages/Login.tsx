import { QueryClient } from "@tanstack/react-query";
import { provider, toValue } from "react-ioc";
import LoginViewModel from "../ViewModel/LoginViewModel";
import { AuthStore } from "../stores/AuthStore";
import { queryClient } from "../utils/utils";
import LoginView from "../view/LoginView";


export const Login = provider(AuthStore, [QueryClient, toValue(queryClient)])(
    () => {
      const viewModel = LoginViewModel();
      return <LoginView viewModel={viewModel}></LoginView>;
    }
  );