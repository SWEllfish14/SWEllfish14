import { useInstance } from "react-ioc";
import { AreeStore } from "../stores/AreeStore";
import { GuastiStore } from "../stores/GuastiStore";
import { LampioniStore } from "../stores/LampioniStore";

export type IHomeViewModel = ReturnType<typeof HomeViewModel>;

export const HomeViewModel=()=> {
     const {aree} =useInstance(AreeStore);
     const {guasti} = useInstance(GuastiStore)
     const {numeroLampioni} = useInstance(LampioniStore)
     return {
        aree: ()=> aree.data?.slice(0,5),
        areeisLoading: ()=> aree.isLoading,
        guastiNumber: ()=> guasti.data?.length,
        guastiisLoading: ()=> guasti.isLoading,
        lampioniNumber:() => numeroLampioni.data,
        lampioniisLoading: () =>numeroLampioni.isLoading
    };
}

export default HomeViewModel;