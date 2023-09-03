import { useInstance } from "react-ioc";
import { AreeStore } from "../stores/AreeStore";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { LampioniStore } from "../stores/LampioniStore";
import { SensoriStore } from "../stores/SensoriStore";

export type IAreaDetailsViewModel = ReturnType<typeof AreaDetailsViewModel>;

export const AreaDetailsViewModel = () => {
  const { id } = useParams();
  const areaStore = useInstance(AreeStore);
  const areaDetails = areaStore.getAreaDetails(id!) ?? {};
  const error = areaDetails.error;
  const navigate = useNavigate();
  const lampioniStore = useInstance(LampioniStore)
  const sensoriStore = useInstance(SensoriStore)

  let [submitHasError,setSubmitHasError]= useState(false)
  let [errorMessage,setErrorMessage]= useState("");
  let [modalita, setModalita] = useState(
    areaStore.getAreaDetails(id!).data?.modalità_funzionamento === "M"
      ? true
      : false
  );
  return {
    areaDetails: () => areaStore.getAreaDetails(id!),
    isLoading: () => areaStore.getAreaDetails(id!).isLoading,
    isError: () => areaStore.getAreaDetails(id!).isError,
    submitHasError,
    errorMessage,
    error: () => {
      if (error instanceof Error) {
        return error;
      }
    },

    aumentaLuminosità: () => {
      if (
        id !== undefined &&
        parseInt(areaStore.getAreaDetails(id!).data?.luminosità_manuale!) < 10
      ){
        areaStore.aumentaLuminositàMutation.mutate({ id });
        if(submitHasError) setSubmitHasError(false);
      }
      else{
        setSubmitHasError(true);
        setErrorMessage("Luminosità area già al massimo");
      }
    },

    diminuisciLuminosità: () => {
      if (
        id !== undefined &&
        parseInt(areaStore.getAreaDetails(id!).data?.luminosità_manuale!) > 0
      ){
        areaStore.diminuisciLuminositàMutation.mutate({ id });
        if(submitHasError) setSubmitHasError(false);
      }
      else{
        setSubmitHasError(true);
        setErrorMessage("Luminosità area già al minimo");
      }
    },
    eliminaArea: async () => {
      if (id !== undefined) {
        const result = await areaStore.eliminaAreaMutation.mutateAsync({ id });
        if (result.isSuccess) {
          navigate("/aree");
        }
      }
    },
    modalita,
    cambiaModalità: async () => {
      if (id !== undefined) {
        const result = await areaStore.cambiaModalitaMutation.mutateAsync({
          id,
        });
        if (result.isSuccess) {
          setModalita(!modalita);
        }
      }
    },
    
    accendiArea:async () => {
      if (id !== undefined) {
        const result = await areaStore.accendiAreaMutation.mutateAsync({
          id,
        });
      }
    },
    accendiLampioniArea:async () => {
      if (id !== undefined) {
        const result = await lampioniStore.accendiLampioniAreaMutation.mutateAsync({
          id,
        });
      }
    },

    spegniLampioniArea:async () => {
      if (id !== undefined) {
        const result = await lampioniStore.spegniLampioniAreaMutation.mutateAsync({
          id,
        });
      }
    }
  };
};

export default AreaDetailsViewModel;