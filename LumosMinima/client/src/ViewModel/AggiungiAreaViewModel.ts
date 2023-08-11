import { useInstance } from "react-ioc";
import{ AreeStore } from "../stores/AreeStore";
import { useParams } from "react-router-dom";

export type IAggiungiAreaViewModel = ReturnType<typeof AggiungiAreaViewModel>;

export const AggiungiAreaViewModel = () => {
    const { id } = useParams();
    const {aree,getAreaDetails} =useInstance(AreeStore);
    return {
        areaDetails: ()=> getAreaDetails(id!),
        isLoading: ()=> getAreaDetails(id!).isLoading,
        isError: () => getAreaDetails(id!).isError,
        error:() => getAreaDetails(id!).error,
    };
  };

