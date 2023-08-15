import { useInstance } from "react-ioc";
import{ SensoriStore } from "../stores/SensoriStore";
import { useParams } from "react-router-dom";

export type IModificaSensoreViewModel = ReturnType<typeof ModificaSensoreViewModel>;

export const ModificaSensoreViewModel = () => {
    const { sensore_id } = useParams();
    const {getdettagliSensori} =useInstance(SensoriStore);
    return {
        sensoreDetails: ()=> getdettagliSensori(sensore_id!),
        isLoading: ()=> getdettagliSensori(sensore_id!).isLoading,
        isError: () => getdettagliSensori(sensore_id!).isError,
        error:() => getdettagliSensori(sensore_id!).error,
    };
  };

