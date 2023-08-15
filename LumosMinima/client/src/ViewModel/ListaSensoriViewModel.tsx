import { observer } from "mobx-react-lite"
import { provider, useInstance } from "react-ioc"
import { useParams } from "react-router-dom";
import { SensoriStore } from "../stores/SensoriStore";


export type IListaSensoriViewModel = ReturnType<typeof ListaSensoriViewModel>;

export const ListaSensoriViewModel = (sensoriStore ?: SensoriStore) => {
    const { id } = useParams();
    const {getlistaSensori} =useInstance(SensoriStore);
    const error = getlistaSensori(id!).error
    return {
       listaSensori: ()=> getlistaSensori(id!).data,
       isLoading: ()=> getlistaSensori(id!).isLoading
    };
  };

  export default ListaSensoriViewModel;