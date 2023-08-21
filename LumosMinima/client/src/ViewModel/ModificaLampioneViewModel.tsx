import { useInstance } from "react-ioc";
import { useParams } from "react-router-dom";
import { LampioniStore } from "../stores/LampioniStore";
import { AreeStore } from "../stores/AreeStore";
import { useState } from "react";

export type IModificaLampioneViewModel = ReturnType<typeof ModificaLampioneViewModel>;

export const ModificaLampioneViewModel = () => {
    const { lamp_id } = useParams();
    //const {AreeId} = useInstance(AreeStore);
    const {getdettagliLampioni} =useInstance(LampioniStore);
    const store = useInstance(LampioniStore);
    let [submitHasError,setSubmitHasError]= useState(false)
    let [submitError,setSubmitError] = useState()
    return {
        dettagliLampione: ()=> getdettagliLampioni(lamp_id!).data,
        isLoading: ()=> getdettagliLampioni(lamp_id!).isLoading,
        isError: () => getdettagliLampioni(lamp_id!).isError,
        error:() => getdettagliLampioni(lamp_id!).error,
        
       // IDAree: () => AreeId.data,
        modificaLampione: async (e:any) => {
            e.preventDefault()
            var data = new FormData(e.target)
              const result = await store.modificaLampioneMutation.mutateAsync({data});
              if (result.isSuccess) {
                //navigate("/lampioni/"+id);
              }
            
    },
    submitIsError:()=>submitHasError,

    clearError:() =>{
        setSubmitHasError(false)
    },
    submitError:() => submitError
    
  
}
};

