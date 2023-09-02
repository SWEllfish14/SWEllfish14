import { useInstance } from "react-ioc";
import { AreeStore } from "../stores/AreeStore";
import { GuastiStore } from "../stores/GuastiStore";
import { LampioniStore } from "../stores/LampioniStore";
import { SensoriStore } from "../stores/SensoriStore";
import { useNavigate } from "react-router";

export type IHomeViewModel = ReturnType<typeof HomeViewModel>;

export const HomeViewModel=()=> {
     const areeStore =useInstance(AreeStore);
     const guastiStore= useInstance(GuastiStore);
     const lampioniStore = useInstance(LampioniStore);
     const sensoriStore= useInstance(SensoriStore);
     return {
        aree: ()=>areeStore.aree,
        areeisLoading: ()=> areeStore.areeIsLoading,
        numeroAree: () => areeStore.numeroAree,
        numeroAreeisLoading: () => areeStore.numeroAreeIsLoading,
        areeLimit: () => areeStore.areeLimit.data,
        areeLimitisLoading:() => areeStore.areeLimit.isLoading,
        guastiNumber: ()=> guastiStore.guastiNumber.data,
        guastiNumberisLoading: ()=> guastiStore.guastiNumber.isLoading,
        guasti: () => guastiStore.guasti.data,
        guastiisLoading: () => guastiStore.guasti.isLoading,
        lampioniNumber:() => lampioniStore.numeroLampioni.data,
        lampioniisLoading: () => lampioniStore.numeroLampioni.isLoading,
        sensoriNumber:() => sensoriStore.numeroSensori.data,
        sensoriisLoading: () => sensoriStore.numeroSensori.isLoading
    };
}

export default HomeViewModel;