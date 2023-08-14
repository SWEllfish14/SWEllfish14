import { observer } from "mobx-react-lite"
import { provider, useInstance } from "react-ioc"
import { useParams } from "react-router-dom";
import { SensoriStore } from "../stores/SensoriStore";


export type IListaSensoriViewModel = ReturnType<typeof ListaSensoriViewModel>;

export const ListaSensoriViewModel = (sensoriStore ?: SensoriStore) => {
    const { id } = useParams();
    const {getdettagliSensori} =useInstance(SensoriStore);
    const error = getdettagliSensori(id!).error
    return {
       dettaglisensori: ()=> getdettagliSensori(id!).data,
       isLoading: ()=> getdettagliSensori(id!).isLoading
    };
  };

  export default ListaSensoriViewModel;