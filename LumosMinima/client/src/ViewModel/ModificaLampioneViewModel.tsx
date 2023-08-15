import { useInstance } from "react-ioc";
import { useParams } from "react-router-dom";
import { LampioniStore } from "../stores/LampioniStore";

export type IModificaLampioneViewModel = ReturnType<typeof ModificaLampioneViewModel>;

export const ModificaLampioneViewModel = () => {
    const { lamp_id } = useParams();
    const {getdettagliLampioni} =useInstance(LampioniStore);
    return {
        dettagliLampione: ()=> getdettagliLampioni(lamp_id!).data,
        isLoading: ()=> getdettagliLampioni(lamp_id!).isLoading,
        isError: () => getdettagliLampioni(lamp_id!).isError,
        error:() => getdettagliLampioni(lamp_id!).error,
        
    };
    
  };

