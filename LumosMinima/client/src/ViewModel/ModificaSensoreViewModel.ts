import { useInstance } from "react-ioc";
import{ SensoriStore } from "../stores/SensoriStore";
import { useParams } from "react-router-dom";

export type IModificaSensoreViewModel = ReturnType<typeof ModificaSensoreViewModel>;

export const ModificaSensoreViewModel = () => {
    const { id } = useParams();
    const store =useInstance(SensoriStore);
    return {
        sensoreDetails: ()=> store.getdettagliSensori(id!),
        isLoading: ()=> store.getdettagliSensori(id!).isLoading,
        isError: () => store.getdettagliSensori(id!).isError,
        error:() => store.getdettagliSensori(id!).error,
    };
  };

