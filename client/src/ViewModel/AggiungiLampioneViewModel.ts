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
    let navigate = useNavigate()
    return {
        //LampioneDetails: ()=> getdettagliLampioni(id!),
        //isLoading: ()=> getdettagliLampioni(id!).isLoading,
        //isError: () => getdettagliLampioni(id!).isError,
        //error:() => getdettagliLampioni(id!).error,
        submitIsError:()=>submitHasError,
        IDAree: () => AreeId.data,
       aggiungiLampione:async (a:any) => {
        a.preventDefault()
        var data2 = new FormData(a.target)
        const result2 = await store.aggiungiLampioneMutation.mutateAsync({data2})
            if(result2.isSuccess){
                //navigate("/area/"+AreeId)
            }
            if(result2.isError){
                a=result2.error
                setSubmitError(a.message)
                setSubmitHasError(true)
                
            }
                 
    },
    clearError:() =>{
        setSubmitHasError(false)
    },
    submitError:() => submitError
    
        
    };
    
  };

