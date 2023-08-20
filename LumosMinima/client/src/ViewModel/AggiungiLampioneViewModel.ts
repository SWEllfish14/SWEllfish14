import { useInstance } from "react-ioc";
import{ LampioniStore } from "../stores/LampioniStore";
import { useParams, useNavigate } from "react-router-dom";
import { AreeStore } from "../stores/AreeStore";
import { isIdentifierStart } from "typescript";

export type IAggiungiLampioneViewModel = ReturnType<typeof AggiungiLampioneViewModel>;

export const AggiungiLampioneViewModel = () => {
   // const { lampID, lampIP, tipo_interazione, luminosità_default, luminosità_rilevamento, id_area_illuminata } = useParams();
    const {AreeId} =useInstance(AreeStore);
    //const {getaggiuntaLampione} = useInstance(LampioniStore);
    const store  = useInstance(LampioniStore);
    return {
        //LampioneDetails: ()=> getdettagliLampioni(id!),
        //isLoading: ()=> getdettagliLampioni(id!).isLoading,
        //isError: () => getdettagliLampioni(id!).isError,
        //error:() => getdettagliLampioni(id!).error,
        IDAree: () => AreeId.data,
       // aggiungiLampione: (lampID: string,lampIP: string, tipo_interazione:string, luminosità_default:number, luminosità_rilevamento:number, id_area_illuminata:number) => getaggiuntaLampione(lampID!, lampIP, tipo_interazione!, luminosità_default!, luminosità_rilevamento!, id_area_illuminata!)
       submit:async (e:any) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const result = await store.aggiungiLampioneMutation.mutateAsync({data})
            if(result.isSuccess){
                //navigate("/area/"+data.get("id"))
            }
            if(result.isError){
                
                e=result.error
                //setSubmitError(e.message)
                //setSubmitHasError(true)
                
            }
                  
    },
       clearError:() =>{
       // setSubmitHasError(false)
    },
        
    };
    
  };

