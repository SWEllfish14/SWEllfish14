import { useInstance } from "react-ioc";
import{ AreeStore } from "../stores/AreeStore";
import { useParams } from "react-router-dom";

export type IAreaDetailsViewModel = ReturnType<typeof AreaDetailsViewModel>;

export const AreaDetailsViewModel = () => {
    const { id } = useParams();
    const store =useInstance(AreeStore);
    const error = store.getAreaDetails(id!).error
    return {
        areaDetails: ()=> store.getAreaDetails(id!),
        isLoading: ()=> store.getAreaDetails(id!).isLoading,
        isError: () => store.getAreaDetails(id!).isError,
        error:() =>  {if(error instanceof Error){
            return error}
        },
        aumentaLuminosità:() => {if(id !== undefined &&parseInt(store.getAreaDetails(id!).data?.luminosità_manuale!) <10)store.aumentaLuminositàMutation.mutate({id})},
        diminuisciLuminosità:() => {if(id !== undefined && parseInt(store.getAreaDetails(id!).data?.luminosità_manuale!) >0)store.diminuisciLuminositàMutation.mutate({id})}
        
    };
  };

  export default AreaDetailsViewModel;