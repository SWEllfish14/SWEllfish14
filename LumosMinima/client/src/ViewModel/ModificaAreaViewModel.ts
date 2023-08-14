import { useInstance } from "react-ioc";
import{ AreeStore } from "../stores/AreeStore";
import { useParams } from "react-router-dom";

export type IModificaAreaViewModel = ReturnType<typeof ModificaAreaViewModel>;

export const ModificaAreaViewModel = () => {
    const { id } = useParams();
    const {aree,getAreaDetails} =useInstance(AreeStore);
    return {
        areaDetails: ()=> getAreaDetails(id!),
        isLoading: ()=> getAreaDetails(id!).isLoading,
        isError: () => getAreaDetails(id!).isError,
        error:() => getAreaDetails(id!).error,
    };
  };

