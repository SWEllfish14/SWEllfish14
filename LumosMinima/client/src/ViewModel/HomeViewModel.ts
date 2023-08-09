import { useInstance } from "react-ioc";
import { AreeStore } from "../stores/AreeStore";
import { GuastiStore } from "../stores/GuastiStore";
import { LampioniStore } from "../stores/LampioniStore";
import { SensoriStore } from "../stores/SensoriStore";

export type IHomeViewModel = ReturnType<typeof HomeViewModel>;

export const HomeViewModel=()=> {
     const {aree} =useInstance(AreeStore);
     const {guasti} = useInstance(GuastiStore);
     const {numeroLampioni} = useInstance(LampioniStore);
     const {numeroSensori} = useInstance(SensoriStore);
     return {
        aree: ()=> aree.data,
        areeisLoading: ()=> aree.data,
        guastiNumber: ()=> guasti.data,
        guastiisLoading: ()=> guasti.isLoading,
        lampioniNumber:() => numeroLampioni.data,
        lampioniisLoading: () =>numeroLampioni.isLoading,
        sensoriNumber:() => numeroSensori.data,
        sensoriisLoading: () =>numeroSensori.isLoading
    };
}

export default HomeViewModel;