import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { inject } from "react-ioc";
import { MobxMutation } from "../utils/mobx_mutation";
import Cookies from 'js-cookie';

export default interface IAuthStore {
  loginMutation :   MobxMutation<unknown, unknown, {
    username: string;
    password: string;
}, unknown>
dispose: () => void;
}

export class AuthStore implements IAuthStore {
  
    queryClient = inject(this, QueryClient);
    
    loginMutation = new MobxMutation<
    unknown,
    unknown,
    { username: string , password : string}
  >({
    mutationFn: async (variables) => {
      await axios.post(
        `http://127.0.0.1:3002/login`,{variables}
      ).then((r) =>{
        const data = r.data;
        const token = data.token;
        if (!token) {
            alert('Unable to login. Please try after some time.');
            return;
        }
        Cookies.set('user-token', token, { expires: 1/24 })
        
    });;

    },
    
  });
  dispose() {
    this.loginMutation.dispose();
  }
}