
import {AreeStore} from "../stores/AreeStore"
import {  useInstance } from "react-ioc"


export type IAreeViewModel = ReturnType<typeof AreeViewModel>;

export const AreeViewModel = () => {
    const aree_store =useInstance(AreeStore);
    return {
        aree: ()=> aree_store.aree.data,
        isLoading: ()=> aree_store.aree.isLoading,
        aumentaLuminositaCrepuscolo: () => aree_store.accendiAllAreeMutation.mutateAsync({}),
        diminuisciLuminositaCrepuscolo: () => aree_store.spegniAllAreeMutation.mutateAsync({})

    };
  };

