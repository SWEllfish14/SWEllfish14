
import {AreeStore} from "../stores/AreeStore"
import {  useInstance } from "react-ioc"


export type IAreeViewModel = ReturnType<typeof AreeViewModel>;

export const AreeViewModel = (areeStore?:AreeStore ) => {
    const {aree} =useInstance(AreeStore);
    return {
        aree: ()=> aree.data,
        isLoading: ()=> aree.isLoading
    };
  };

