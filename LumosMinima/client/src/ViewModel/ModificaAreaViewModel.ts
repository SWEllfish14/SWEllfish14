import { useInstance } from "react-ioc";
import{ AreeStore } from "../stores/AreeStore";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export type IModificaAreaViewModel = ReturnType<typeof ModificaAreaViewModel>;

export const ModificaAreaViewModel = () => {
    const { id } = useParams();
    const store =useInstance(AreeStore);
    const navigate = useNavigate()
    let [submitHasError,setSubmitHasError]= useState(false)
    let [submitError,setSubmitError] = useState("")
    return {
        areaDetails: ()=> store.getAreaDetails(id!),
        isLoading: ()=> store.getAreaDetails(id!).isLoading,
        isError: () => store.getAreaDetails(id!).isError,
        error:() => store.getAreaDetails(id!).error,
        submitIsError:()=>submitHasError,
        modificaArea: async (e:any) => {
            e.preventDefault()
            const data = new FormData(e.target)
            console.log(data)
            if(typeof id === "string"){
                const result = await store.modificaAreaMutation.mutateAsync({data,id})
                if(result.isSuccess){
                    navigate("/area/"+id)
                }
                if(result.isError){
                    
                    e=result.error
                    setSubmitError(e.message)
                    setSubmitHasError(true)
                    
                }
            }
            else{
                setSubmitError("ID non valido")
            }
                
                
            
        }
    };
  };

