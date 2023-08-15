import { observer } from "mobx-react-lite"
import {LampioniStore} from "../stores/LampioniStore"
import { provider, useInstance } from "react-ioc"
import { useParams } from "react-router-dom";


export type IListaLampioniViewModel = ReturnType<typeof ListaLampioniViewModel>;

export const ListaLampioniViewModel = (lampioniStore ?: LampioniStore) => {
    const { id } = useParams();

    const store =useInstance(LampioniStore);
    const error = store.getlistaLampioni(id!).error
    return {
       listaLampioni: ()=> store.getlistaLampioni(id!).data,
       isLoading: ()=> store.getlistaLampioni(id!).isLoading,
       eliminaLampione: (lampID:string) => store.geteliminaLampione(lampID!)
    };
  };

  export default ListaLampioniViewModel;