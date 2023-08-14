import { observer } from "mobx-react-lite"
import {LampioniStore} from "../stores/LampioniStore"
import { provider, useInstance } from "react-ioc"
import { useParams } from "react-router-dom";


export type IListaLampioniViewModel = ReturnType<typeof ListaLampioniViewModel>;

export const ListaLampioniViewModel = (lampioniStore ?: LampioniStore) => {
    const { id } = useParams();
    const {lampID} = useParams();
    const {getdettagliLampioni, geteliminaLampione} =useInstance(LampioniStore);
    const error = getdettagliLampioni(id!).error
    return {
       dettaglilampioni: ()=> getdettagliLampioni(id!).data,
       isLoading: ()=> getdettagliLampioni(id!).isLoading,
       eliminaLampione: () => geteliminaLampione(lampID!).data
    };
  };

  export default ListaLampioniViewModel;