import { useInstance } from "react-ioc";
import{ AreeStore } from "../stores/AreeStore";
import { useParams } from "react-router-dom";

export type IAggiungiLampioneViewModel = ReturnType<typeof AggiungiLampioneViewModel>;

export const AggiungiLampioneViewModel = () => {
    /*const { id } = useParams();
    const {aree,getLampioneDetails} =useInstance(AreeStore);
    return {
        LampioneDetails: ()=> getLampioneDetails(id!),
        isLoading: ()=> getLampioneDetails(id!).isLoading,
        isError: () => getLampioneDetails(id!).isError,
        error:() => getLampioneDetails(id!).error,
        
    };
    */
  };

