import { useInstance } from "react-ioc";
import{ LampioniStore } from "../stores/LampioniStore";
import { useParams, useNavigate } from "react-router-dom";
import { AreeStore } from "../stores/AreeStore";
import { isIdentifierStart } from "typescript";
import { useState } from "react";

export type IAggiungiLampioneViewModel = ReturnType<typeof AggiungiLampioneViewModel>;

export const AggiungiLampioneViewModel = () => {
    const {AreeId} =useInstance(AreeStore);
    const store  = useInstance(LampioniStore);
    let [submitHasError,setSubmitHasError]= useState(false)
    let [submitError,setSubmitError] = useState()
    
    return {
        //LampioneDetails: ()=> getdettagliLampioni(id!),
        //isLoading: ()=> getdettagliLampioni(id!).isLoading,
        //isError: () => getdettagliLampioni(id!).isError,
        //error:() => getdettagliLampioni(id!).error,
        submitIsError:()=>submitHasError,
        IDAree: () => AreeId.data,
       submit:async (e:any) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const result = await store.aggiungiLampioneMutation.mutateAsync({data})
            if(result.isSuccess){
                //navigate("/area/"+data.get("id"))
            }
            if(result.isError){
                e=result.error
                setSubmitError(e.message)
                setSubmitHasError(true)
                
            }
                  
    },
    clearError:() =>{
        setSubmitHasError(false)
    },
    submitError:() => submitError
    
        
    };
    
  };

