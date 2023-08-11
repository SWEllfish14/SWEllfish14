import { useInstance } from "react-ioc";
import{ AreeStore } from "../stores/AreeStore";
import { useParams } from "react-router-dom";

export type IAreaDetailsViewModel = ReturnType<typeof AreaDetailsViewModel>;

export const AreaDetailsViewModel = () => {
    const { id } = useParams();
    const {aree,getAreaDetails} =useInstance(AreeStore);
    return {
        areaDetails: ()=> getAreaDetails(id!),
        isLoading: ()=> getAreaDetails(id!).isLoading,
        isError: () => getAreaDetails(id!).isError,
        error:() => getAreaDetails(id!).error,
    };
  };

  export default AreaDetailsViewModel;