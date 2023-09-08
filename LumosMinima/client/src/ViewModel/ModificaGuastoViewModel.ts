import { useInstance } from "react-ioc";
import { GuastiStore } from "../stores/GuastiStore";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
export type IModificaGuastoViewModel = ReturnType<typeof ModificaGuastoViewModel>;

export const ModificaGuastoViewModel = () => {
    const { id } = useParams();
    const store = useInstance(GuastiStore);
    // let [submitHasError,setSubmitHasError]= useState(false)
    // let [submitError,setSubmitError] = useState()
    
    const navigate = useNavigate()
    return {
        guastoDetails: ()=> store.getGuastoDetails(id!),
        isLoading: ()=> store.getGuastoDetails(id!).isLoading,
        isError: () => store.getGuastoDetails(id!).isError,
        error:() => store.getGuastoDetails(id!).error,
        submitIsError:()=>store.submitError!=='',
        submit:async (e:any) => {
            
            e.preventDefault()
            var data = new FormData(e.target)

            
            if(typeof id === "string"){
                
                const result = await store.modificaGuastoMutation.mutateAsync({id,data})
            
               if(result.isSuccess){
                navigate("/guasti")
                }
                if(result.isError){
                    
                    e=result.error
                    store.setSubmitError(e.message);
                    
                }
            }
                   
        },
        clearError:() =>{
            store.clearSubmitError()
        },
        submitError:() => store.submitError,
        
    };
  };

