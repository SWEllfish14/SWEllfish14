import { useInstance } from "react-ioc";
import{ SensoriStore } from "../stores/SensoriStore";
import { useParams, useNavigate } from "react-router-dom";
import { AreeStore } from "../stores/AreeStore";
import { useState } from "react";


export type IAggiungiSensoreViewModel = ReturnType<typeof AggiungiSensoreViewModel>;

export const AggiungiSensoreViewModel = () => {
    const { id } = useParams();
    /*
    const {aree,getSensoreDetails} =useInstance(AreeStore);
    return {
        SensoreDetails: ()=> getSensoreDetails(id!),
        isLoading: ()=> getSensoreDetails(id!).isLoading,
        isError: () => getSensoreDetails(id!).isError,
        error:() => getSensoreDetails(id!).error,
        
    };
    */
    const store = useInstance(SensoriStore);
    const area_store = useInstance(AreeStore);
    let [submitHasError,setSubmitHasError]= useState(false)
    let [submitError,setSubmitError] = useState()
    let navigate = useNavigate()
   return {
   
    areaDetails: ()=> area_store.getAreaDetails(id!),
    submitIsError:()=>submitHasError,
    submit:async (e:any) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const result = await store.aggiungiSensoreMutation.mutateAsync({data})
            if(result.isSuccess){
                //navigate("/sensori/"+data.get("id"))
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

