import { observer } from "mobx-react-lite"
import { LampioniStore } from "../stores/LampioniStore"
import { provider, useInstance } from "react-ioc"
import { useParams,useNavigate, useResolvedPath } from "react-router-dom";


export type IListaLampioniViewModel = ReturnType<typeof ListaLampioniViewModel>;

export const ListaLampioniViewModel = () => {
    const { id } = useParams();
   const {lampID} = useParams();
    const lampioniStore =useInstance(LampioniStore);
    const error = lampioniStore.getlistaLampioni(id!).error
    const navigate = useNavigate();
    return {
       listaLampioni: ()=> lampioniStore.getlistaLampioni(id!).data,
       isLoading: ()=> lampioniStore.getlistaLampioni(id!).isLoading,
       //eliminaLampione: (lampID:string) => store.geteliminaLampione(lampID!),
       eliminaLampione: async () => {
         if (id !== undefined) {
           const result = await lampioniStore.deleteLampioneMutation.mutateAsync({ lampID });
           if (result.isSuccess) {
             //navigate("/lampioni/"+id);
           }
         }
       },
    };
  };

  export default ListaLampioniViewModel;