import { observer } from "mobx-react-lite"
import {GuastiStore} from "../stores/GuastiStore"
import { provider, useInstance } from "react-ioc"


export type IListaGuastiViewModel = ReturnType<typeof ListaGuastiViewModel>;

export const ListaGuastiViewModel = (guastiStore?:GuastiStore ) => {
    const {guasti} =useInstance(GuastiStore);
    return {
       guasti: ()=> guasti.data,
      isLoading: ()=> guasti.isLoading
    };
  };

