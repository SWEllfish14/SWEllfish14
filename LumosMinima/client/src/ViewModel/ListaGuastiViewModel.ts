import { observer } from "mobx-react-lite"
import {GuastiStore} from "../stores/GuastiStore"
import { provider, useInstance } from "react-ioc"


export type IListaGuastiViewModel = ReturnType<typeof ListaGuastiViewModel>;

export const ListaGuastiViewModel = () => {
    const guasti_store =useInstance(GuastiStore);
    return {
       guastiAperti: ()=> guasti_store.getGuastiAperti().data,
       guastiChiusi: ()=> guasti_store.getGuastiChiusi().data,
      
      
       isLoading: ()=> guasti_store.guasti.isLoading,
    };
  };

export default ListaGuastiViewModel;