import { useInstance } from "react-ioc";
import{ LampioniStore } from "../stores/LampioniStore";
import { useParams, useNavigate } from "react-router-dom";
import { AreeStore } from "../stores/AreeStore";
import { useState } from "react";

export type IAggiungiLampioneViewModel = ReturnType<typeof AggiungiLampioneViewModel>;

export const AggiungiLampioneViewModel = () => {
   // const {AreeId} =useInstance(AreeStore);
    const { id } = useParams(); // id area illuminata da passare
    const store  = useInstance(LampioniStore);
    const area_store = useInstance(AreeStore)
    // let [submitHasError,setSubmitHasError]= useState(false)
    // let [submitError,setSubmitError] = useState()
    let navigate = useNavigate()
    return {
        //LampioneDetails: ()=> getdettagliLampioni(id!),
        //isLoading: ()=> getdettagliLampioni(id!).isLoading,
        //isError: () => getdettagliLampioni(id!).isError,
        //error:() => getdettagliLampioni(id!).error,
        areaDetails: ()=> area_store.getAreaDetails(id!),
        submitIsError:()=>area_store.submitError !=='',
        //IDAree: () => AreeId.data,
       aggiungiLampione:async(a:any) => {
        console.log(id)
        a.preventDefault()
        var data2 = new FormData(a.target)
         const result2 = await store.aggiungiLampioneMutation.mutateAsync({data2})
            if(result2.isSuccess){
                navigate("/area/"+id)
            }
            if(result2.isError){
                a=result2.error
                area_store.setSubmitError(a.message)
                
                
            }
                
    },
    clearError:() =>{
        area_store.clearSubmitError()
    },
    submitError:() => area_store.submitError
    
        
    };
    
  };

