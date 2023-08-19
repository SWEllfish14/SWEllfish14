import { useInstance } from "react-ioc";
import { AreeStore } from "../stores/AreeStore";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export type IAreaDetailsViewModel = ReturnType<typeof AreaDetailsViewModel>;

export const AreaDetailsViewModel = () => {
  const { id } = useParams();
  const areaStore = useInstance(AreeStore);
  const error = areaStore.getAreaDetails(id!).error;
  const navigate = useNavigate();
  let [modalita, setModalita] = useState(
    areaStore.getAreaDetails(id!).data?.modalità_funzionamento === "M"
      ? true
      : false
  );
  return {
    areaDetails: () => areaStore.getAreaDetails(id!),
    isLoading: () => areaStore.getAreaDetails(id!).isLoading,
    isError: () => areaStore.getAreaDetails(id!).isError,
    error: () => {
      if (error instanceof Error) {
        return error;
      }
    },
    aumentaLuminosità: () => {
      if (
        id !== undefined &&
        parseInt(areaStore.getAreaDetails(id!).data?.luminosità_manuale!) < 10
      )
        areaStore.aumentaLuminositàMutation.mutate({ id });
    },
    diminuisciLuminosità: () => {
      if (
        id !== undefined &&
        parseInt(areaStore.getAreaDetails(id!).data?.luminosità_manuale!) > 0
      )
        areaStore.diminuisciLuminositàMutation.mutate({ id });
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
    cambiaStatoArea:async () => {
      if (id !== undefined) {
        const result = await areaStore.cambiaStatoMutation.mutateAsync({
          id,
        });
      }
    }
  };
};

export default AreaDetailsViewModel;
