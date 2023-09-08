import { useInstance } from "react-ioc";
import { useNavigate, useParams } from "react-router-dom";
import { LampioniStore } from "../stores/LampioniStore";
import { AreeStore } from "../stores/AreeStore";
import { useState } from "react";

export type IModificaLampioneViewModel = ReturnType<typeof ModificaLampioneViewModel>;

export const ModificaLampioneViewModel = () => {
    const { id } = useParams();
    //const {AreeId} = useInstance(AreeStore);
    const store = useInstance(LampioniStore);
    // let [submitHasError,setSubmitHasError]= useState(false)
    // let [submitError,setSubmitError] = useState()
    const navigate = useNavigate()
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
                navigate("/aree");
              }
                if(result.isError){
                    
                    e=result.error
                    store.setSubmitError(e.message)
                  
                    
                }
            
    },
    eliminaLampione: async () => {
      if (id !== undefined) {
        const result = await store.deleteLampioneMutation.mutateAsync({ id });
        if (result.isSuccess) {
          navigate("/aree");
        }
      }
    },
    
    submitIsError:()=>store.submitError!=='',

    clearError:() =>{
        store.clearSubmitError()
    },
    submitError:() => store.submitError
    
  
}
};

