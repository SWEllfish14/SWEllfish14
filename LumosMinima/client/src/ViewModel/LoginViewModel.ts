import axios from "axios";
import { AuthStore } from "../stores/AuthStore";
import { useInstance } from "react-ioc";
import { useNavigate } from "react-router-dom";

export type ILoginViewModel = ReturnType<typeof LoginViewModel>;

export const LoginViewModel = () => {
    const authStore = useInstance(AuthStore);
    const navigate = useNavigate()
    return {
       submit:async (e:any) => {
        console.log("sadasdasdsa")
        e.preventDefault()
        var data = new FormData(e.target)
        const username = data.get("nomeUtente")
        const password = data.get("password")
        if( username  && password){
            const result = await authStore.loginMutation.mutateAsync({username:username.toString(),password:password?.toString()})
            if(result.isSuccess){
                navigate("/aree")
            }
        }
        
               
       }
  };
}

  export default LoginViewModel;