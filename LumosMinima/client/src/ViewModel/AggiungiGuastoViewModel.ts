import { useInstance } from "react-ioc";
import{ AreeStore } from "../stores/AreeStore";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { GuastiStore } from "../stores/GuastiStore";

export type IAggiungiGuastoViewModel = ReturnType<typeof AggiungiGuastoViewModel>;

export const AggiungiGuastoViewModel = () => {
    const { id } = useParams();
    const areeStore =useInstance(AreeStore);
    const guastiStore = useInstance(GuastiStore)
    // let [submitHasError,setSubmitHasError]= useState(false)
    // let [submitError,setSubmitError] = useState()
    
    const navigate = useNavigate()
    return {
        areaDetails: ()=> areeStore.getAreaDetails(id!),
        isLoading: ()=> areeStore.getAreaDetails(id!).isLoading,
        isError: () => areeStore.getAreaDetails(id!).isError,
        error:() => areeStore.getAreaDetails(id!).error,
        submitIsError:()=>areeStore.submitError !== '',
        IDAreeMax: () => areeStore.AreeIdMax.data,
        submit:async (e:any) => {
            e.preventDefault()
            var data = new FormData(e.target)
            const result = await guastiStore.aggiungiGuastoMutation.mutateAsync({data})
               if(result.isSuccess){
                    navigate("/guasti")
                }
                if(result.isError){
                    e=result.error
                    areeStore.setSubmitError(e.message)
                    
                    
                }     
                
        },
        clearError:() =>{
            areeStore.clearSubmitError()
        },
        submitError:() => areeStore.submitError
    };
  };

