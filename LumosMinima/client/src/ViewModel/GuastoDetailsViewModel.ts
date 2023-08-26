import { useInstance } from "react-ioc";
import {GuastiStore} from "../stores/GuastiStore"
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { LampioniStore } from "../stores/LampioniStore";

export type IGuastoDetailsViewModel = ReturnType<typeof GuastoDetailsViewModel>;

export const GuastoDetailsViewModel = () => {
    const { id } = useParams();
    const areaStore = useInstance(GuastiStore);
    //const error = areaStore.getAreaDetails(id!).error;
    const navigate = useNavigate();
    return {



        //guastoDetails: () => areaStore.getGuastoDetails(id!),

/*         eliminaGuasto: async () => {
            if (id !== undefined) {
              const result = await areaStore.eliminaAreaMutation.mutateAsync({ id });
              if (result.isSuccess) {
                navigate("/guasti");
              }
            }
          }, */
    }
}