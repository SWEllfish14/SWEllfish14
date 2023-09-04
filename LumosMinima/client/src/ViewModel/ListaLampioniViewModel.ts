
import { LampioniStore } from "../stores/LampioniStore"

import { AreeStore } from "../stores/AreeStore"
import { provider, useInstance } from "react-ioc"
import { useParams,useNavigate, useResolvedPath } from "react-router-dom";


export type IListaLampioniViewModel = ReturnType<typeof ListaLampioniViewModel>;

export const ListaLampioniViewModel = () => {
    const { id } = useParams();
    const lampioniStore =useInstance(LampioniStore);
    const areaStore = useInstance(AreeStore)
    const error = lampioniStore.getlistaLampioni(id!).error
    const navigate = useNavigate();
    return {
      areaDetails: () => areaStore.getAreaDetails(id!),
      dettagliLampione: ()=> lampioniStore.getdettagliLampioni(id!),
       listaLampioni: ()=> lampioniStore.getlistaLampioni(id!).data,
       isLoading: ()=> lampioniStore.getlistaLampioni(id!).isLoading,
      accendiLampione: (lampID:string)=> lampioniStore.accendiLampioneMutation.mutateAsync({lampID}),
      spegniLampione: (lampID:string)=> lampioniStore.spegniLampioneMutation.mutateAsync({lampID}),
       //eliminaLampione: (lampID:string) => store.geteliminaLampione(lampID!),
    };
  };

  export default ListaLampioniViewModel;