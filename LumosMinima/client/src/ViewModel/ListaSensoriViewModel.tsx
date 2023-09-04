import {  useInstance } from "react-ioc"
import { useParams } from "react-router-dom";
import { SensoriStore } from "../stores/SensoriStore";


export type IListaSensoriViewModel = ReturnType<typeof ListaSensoriViewModel>;

export const ListaSensoriViewModel = (sensoriStore ?: SensoriStore) => {
    const { id } = useParams();
    const store =useInstance(SensoriStore);
    const error = store.getlistaSensori(id!).error
    return {
       listaSensori: ()=> store.getlistaSensori(id!).data,
       isLoading: ()=> store.getlistaSensori(id!).isLoading,
    };
  };

  export default ListaSensoriViewModel;