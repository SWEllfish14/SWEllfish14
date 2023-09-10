import { useInstance } from "react-ioc";
import{ SensoriStore } from "../stores/SensoriStore";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export type IModificaSensoreViewModel = ReturnType<typeof ModificaSensoreViewModel>;

export const ModificaSensoreViewModel = () => {
    const { id } = useParams();
    const store =useInstance(SensoriStore);
    // let [submitHasError,setSubmitHasError]= useState(false)
    // let [submitError,setSubmitError] = useState()
    const navigate = useNavigate();
    
    return {
        sensoreDetails: ()=> store.getdettagliSensori(id!),
        // isLoading: ()=> store.getdettagliSensori(id!).isLoading,
        // isError: () => store.getdettagliSensori(id!).isError,
        // error:() => store.getdettagliSensori(id!).error,
        submitIsError:()=>store.submitError !== '',
        submit:async (e:any) => {
            console.log(id)
            console.log("okkk")
            e.preventDefault()
            var data = new FormData(e.target)
            if(typeof id === "string"){
                console.log("okk")
                const result = await store.modificaSensoreMutation.mutateAsync({id,data})
            
               if(result.isSuccess){
                    navigate("/aree")
                }
                if(result.isError){
                    
                    e=result.error
                    store.setSubmitError(e.message)
                    
                    
                }
            }
                   
        },
        eliminaSensore: async () => {
            console.log(id)
            if (id !== undefined) {
              const result = await store.eliminaSensoreMutation.mutateAsync({ id });
              if (result.isSuccess) {
                navigate("/aree");
              }
              
            }
          },
        clearError:() =>{
            store.clearSubmitError()
        },
        // submitError:() => store.submitError
    };
  };

