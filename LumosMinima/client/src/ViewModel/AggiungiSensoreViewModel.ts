import { useInstance } from "react-ioc";
import{ AreeStore } from "../stores/AreeStore";
import { useParams } from "react-router-dom";

export type IAggiungiSensoreViewModel = ReturnType<typeof AggiungiSensoreViewModel>;

export const AggiungiSensoreViewModel = () => {
    /*const { id } = useParams();
    const {aree,getSensoreDetails} =useInstance(AreeStore);
    return {
        SensoreDetails: ()=> getSensoreDetails(id!),
        isLoading: ()=> getSensoreDetails(id!).isLoading,
        isError: () => getSensoreDetails(id!).isError,
        error:() => getSensoreDetails(id!).error,
        
    };
    */
  };

