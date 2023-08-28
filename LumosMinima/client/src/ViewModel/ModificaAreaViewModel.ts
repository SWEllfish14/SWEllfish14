import { useInstance } from "react-ioc";
import{ AreeStore } from "../stores/AreeStore";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
export type IModificaAreaViewModel = ReturnType<typeof ModificaAreaViewModel>;

export const ModificaAreaViewModel = () => {
    const { id } = useParams();
    const store =useInstance(AreeStore);
    let [submitHasError,setSubmitHasError]= useState(false)
    let [submitError,setSubmitError] = useState()
    
    const navigate = useNavigate()
    return {
        areaDetails: ()=> store.getAreaDetails(id!),
        isLoading: ()=> store.getAreaDetails(id!).isLoading,
        isError: () => store.getAreaDetails(id!).isError,
        error:() => store.getAreaDetails(id!).error,
        submitIsError:()=>submitHasError,
        submit:async (e:any) => {

            
            e.preventDefault()
            var data = new FormData(e.target)
            console.log(data)
            if(typeof id === "string"){
                
                const result = await store.modificaAreaMutation.mutateAsync({id,data})
            
               if(result.isSuccess){
                navigate("/aree")
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

