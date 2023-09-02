/* eslint-disable react-hooks/rules-of-hooks */


import {AreeStore} from "../stores/AreeStore"
import {  useInstance } from "react-ioc"
import { queryClient } from "../utils/utils";


export type IAreeViewModel = ReturnType<typeof AreeViewModel>;

export const AreeViewModel = (areeStore?:AreeStore ) => {
    const aree_store  =useInstance(AreeStore)
    return {
        aree: ()=> aree_store.aree,
        isLoading: ()=> aree_store.areeIsLoading,
        aumentaLuminositaCrepuscolo: async () => {
            console.log('aumentaLuminositaCrepuscolo called')
            await aree_store.accendiAllAreeMutation.mutateAsync({});
          },
        diminuisciLuminositaCrepuscolo: async () => {
            await aree_store.spegniAllAreeMutation.mutateAsync({});
          },
        
    };
  };

