import { observer } from "mobx-react-lite"
import {LampioniStore} from "../stores/LampioniStore"
import { provider, useInstance } from "react-ioc"
import { useParams } from "react-router-dom";


export type IListaLampioniViewModel = ReturnType<typeof ListaLampioniViewModel>;

export const ListaLampioniViewModel = (lampioniStore ?: LampioniStore) => {
    const { id } = useParams();

    const store =useInstance(LampioniStore);
    const error = store.getdettagliLampioni(id!).error
    return {
       dettaglilampioni: ()=> store.getdettagliLampioni(id!).data,
       isLoading: ()=> store.getdettagliLampioni(id!).isLoading,
       eliminaLampione: (lampID:number) => store.geteliminaLampione(lampID!)
    };
  };

  export default ListaLampioniViewModel;