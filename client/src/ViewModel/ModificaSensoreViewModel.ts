import { useInstance } from "react-ioc";
import{ SensoriStore } from "../stores/SensoriStore";
import { useParams } from "react-router-dom";
import { useState } from "react";

export type IModificaSensoreViewModel = ReturnType<typeof ModificaSensoreViewModel>;

export const ModificaSensoreViewModel = () => {
    const { id } = useParams();
    const store =useInstance(SensoriStore);
    let [submitHasError,setSubmitHasError]= useState(false)
    let [submitError,setSubmitError] = useState()
    
    return {
        sensoreDetails: ()=> store.getdettagliSensori(id!),
        isLoading: ()=> store.getdettagliSensori(id!).isLoading,
        isError: () => store.getdettagliSensori(id!).isError,
        error:() => store.getdettagliSensori(id!).error,
        submitIsError:()=>submitHasError,
        submit:async (e:any) => {

            console.log("okkk")
            e.preventDefault()
            var data = new FormData(e.target)
            if(typeof id === "string"){
                console.log("okk")
                const result = await store.modificaSensoreMutation.mutateAsync({id,data})
            
               if(result.isSuccess){
                    
                }
                if(result.isError){
                    
                    e=result.error
                    setSubmitError(e.message)
                    setSubmitHasError(true)
                    
                }
            }
                   
        },
        clearError:() =>{
            setSubmitHasError(false)
        },
        submitError:() => submitError
    };
  };

