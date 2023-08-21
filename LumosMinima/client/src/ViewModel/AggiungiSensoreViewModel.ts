import { useInstance } from "react-ioc";
import{ SensoriStore } from "../stores/SensoriStore";
import { useParams } from "react-router-dom";
import { AreeStore } from "../stores/AreeStore";

export type IAggiungiSensoreViewModel = ReturnType<typeof AggiungiSensoreViewModel>;

export const AggiungiSensoreViewModel = () => {
    /*const { id } = useParams();
    const {aree,getSensoreDetails} =useInstance(AreeStore);
    return {
        SensoreDetails: ()=> getSensoreDetails(id!),
        isLoading: ()=> getSensoreDetails(id!).isLoading,
        isError: () => getSensoreDetails(id!).isError,
        error:() => getSensoreDetails(id!).error,
        
    };
    */
    const store = useInstance(SensoriStore);
    const {AreeId} = useInstance(AreeStore);
   return {
   
    IDAree: () => AreeId.data,
    submit:async (e:any) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const result = await store.aggiungiSensoreMutation.mutateAsync({data})
            if(result.isSuccess){
               // navigate("/area/"+data.get("id"))
            }
            if(result.isError){
                
                e=result.error
                //setSubmitError(e.message)
                //setSubmitHasError(true)
                
            }
                  
            
    },
  };
};

