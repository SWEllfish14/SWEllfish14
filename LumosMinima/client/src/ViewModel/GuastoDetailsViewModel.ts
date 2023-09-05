import { useInstance } from "react-ioc";
import { GuastiStore} from "../stores/GuastiStore"
import { useNavigate, useParams } from "react-router-dom";

export type IGuastoDetailsViewModel = ReturnType<typeof GuastoDetailsViewModel>;

export const GuastoDetailsViewModel = () => {
    const { id } = useParams();
    const guastoStore = useInstance(GuastiStore);
    const error = guastoStore.getGuastoDetails(id!).error;
    const navigate = useNavigate();


    return {

      guastoDetails: () => guastoStore.getGuastoDetails(id!),
      isLoading: () => guastoStore.getGuastoDetails(id!).isLoading,
      isError: () => guastoStore.getGuastoDetails(id!).isError,

      error: () => {
        if (error instanceof Error) {
          return error;
        }
      },

        chiudiGuasto: async () => {
            if (id !== undefined) {
              const result = await guastoStore.chiudiGuastoMutation.mutateAsync({ id });
              if (result.isSuccess) {
                navigate("/guasti");
              }
            }
          },
    }
}