import { observer } from "mobx-react-lite"
import {LampioniStore} from "../stores/LampioniStore"
import { provider, useInstance } from "react-ioc"
import { useParams } from "react-router-dom";


export type IListaLampioniViewModel = ReturnType<typeof ListaLampioniViewModel>;

export const ListaLampioniViewModel = (lampioniStore?:LampioniStore ) => {
    const { id } = useParams();
    const {numeroLampioni, getdettagliLampioni} =useInstance(LampioniStore);
    return {
       dettaglilampioni: ()=> getdettagliLampioni(id!),
      isLoading: ()=> getdettagliLampioni(id!).isLoading
    };
  };

  export default ListaLampioniViewModel;