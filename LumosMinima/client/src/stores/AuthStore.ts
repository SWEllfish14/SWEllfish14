import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { inject } from "react-ioc";
import { MobxMutation } from "../utils/mobx_mutation";
export default interface IAuthStore {}

export class AuthStore implements IAuthStore {
    queryClient = inject(this, QueryClient);
    login(username:string,password:string){
        axios
        .post(`http://localhost:3002/login`,{username,password})
        .then((r) =>{
            const data = r.data;
            const token = data.token;
            if (!token) {
                alert('Unable to login. Please try after some time.');
                return;
            }
            localStorage.clear();
            localStorage.setItem('user-token', token);
            
        });
    }
    
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
        localStorage.clear();
        localStorage.setItem('user-token', token);
        
    });;

    },
    
  });
}