import { useInstance } from "react-ioc";
import { AreeStore } from "../stores/AreeStore";
import { GuastiStore } from "../stores/GuastiStore";
import { LampioniStore } from "../stores/LampioniStore";
import { SensoriStore } from "../stores/SensoriStore";
import { AuthStore } from "../stores/AuthStore";

export type IHomeViewModel = ReturnType<typeof HomeViewModel>;

export const HomeViewModel=()=> {
     const {aree, numeroAree, areeLimit} =useInstance(AreeStore);
     const {guastiNumber, guasti} = useInstance(GuastiStore);
     const {numeroLampioni} = useInstance(LampioniStore);
     const {numeroSensori} = useInstance(SensoriStore);
     return {
        aree: ()=> aree.data,
        areeisLoading: ()=> aree.isLoading,
        numeroAree: () => numeroAree.data,
        numeroAreeisLoading: () => numeroAree.isLoading,
        areeLimit: () => areeLimit.data,
        areeLimitisLoading:() => areeLimit.isLoading,
        guastiNumber: ()=> guastiNumber.data,
        guastiNumberisLoading: ()=> guastiNumber.isLoading,
        guasti: () => guasti.data,
        guastiisLoading: () => guasti.isLoading,
        lampioniNumber:() => numeroLampioni.data,
        lampioniisLoading: () =>numeroLampioni.isLoading,
        sensoriNumber:() => numeroSensori.data,
        sensoriisLoading: () =>numeroSensori.isLoading
    };
}

export default HomeViewModel;