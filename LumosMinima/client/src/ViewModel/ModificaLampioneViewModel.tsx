import { useInstance } from "react-ioc";
import { useParams } from "react-router-dom";
import { LampioniStore } from "../stores/LampioniStore";
import { AreeStore } from "../stores/AreeStore";
import { useState } from "react";

export type IModificaLampioneViewModel = ReturnType<typeof ModificaLampioneViewModel>;

export const ModificaLampioneViewModel = () => {
    const { id } = useParams();
    //const {AreeId} = useInstance(AreeStore);
    const store = useInstance(LampioniStore);
    let [submitHasError,setSubmitHasError]= useState(false)
    let [submitError,setSubmitError] = useState()
    return {
        dettagliLampione: ()=> store.getdettagliLampioni(id!),
        isLoading: ()=> store.getdettagliLampioni(id!).isLoading,
        isError: () => store.getdettagliLampioni(id!).isError,
        error:() => store.getdettagliLampioni(id!).error,
        
       // IDAree: () => AreeId.data,
        modificaLampione: async (e:any) => {
            e.preventDefault()
            var data = new FormData(e.target)
            console.log(data)
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

