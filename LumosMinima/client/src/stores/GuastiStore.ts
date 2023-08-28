import { makeAutoObservable } from 'mobx';
import axios from "axios";
import { MobxQuery } from '../utils/mobxqueryts';
import {  GetNumeroGuastiJTO, GetGuastoJTO, GetGuastoDetailsJTO } from '../utils/api-types';
import { QueryKey,QueryClient, QueryObserverResult } from '@tanstack/react-query';
import { MobxMutation } from '../utils/mobx_mutation';
import { inject } from 'react-ioc';


export default interface IGuastiStore{

  modificaGuastoMutation: MobxMutation<
  unknown,
  unknown,
  {
    id: string,
    data: FormData
  },
  unknown
  >;

  eliminaGuastoMutation :MobxMutation<
  unknown,
  unknown,
  {
    id: string;
  },
  unknown
  >;
  
    guastiNumberQueryResult: MobxQuery<GetNumeroGuastiJTO, unknown, GetNumeroGuastiJTO, GetNumeroGuastiJTO, QueryKey>
    guastiQueryResult: MobxQuery<GetGuastoJTO, unknown, GetGuastoJTO, GetGuastoJTO, QueryKey>
    get guasti():QueryObserverResult<GetGuastoJTO, unknown>
    dispose: ()=>void;

}

export class GuastiStore implements IGuastiStore {
    queryClient = inject(this, QueryClient);

    guastiNumberQueryResult = new MobxQuery<GetNumeroGuastiJTO>({
        queryKey: ['numeroGuasti'],
        queryFn: () => axios.get('http://localhost:3002/numeroGuasti').then((r) => r.data["numeroGuasti"]),
      });

      guastiQueryResult = new MobxQuery<GetGuastoJTO>({
        queryKey: ['guasti'],
        queryFn: () => axios.get('http://localhost:3002/guasti').then((r) => r.data),
      });

      guastoDetailsQueryResult = new MobxQuery<GetGuastoDetailsJTO>({
        queryFn: ({ queryKey }) => {
          return axios
            .get(`http://localhost:3002/guasti/${queryKey[1]}`)
            .then((r) => r.data);
        },
      });
      
      getGuastoDetails(guastoId: string) {
        return this.guastoDetailsQueryResult.query({
          queryKey: ["guasti", guastoId],
        });
      }


    eliminaGuastoMutation = new MobxMutation<unknown,unknown,{id:string}>(
      {
        mutationFn: async (variables) => {
          await axios.post(`http://127.0.0.1:3002/eliminaGuasto/${variables.id}`)
        },
        onSuccess: (data, variables) => {
          this.queryClient.invalidateQueries(["aree"]);
        },
      }
    )

    modificaGuastoMutation = new MobxMutation<unknown,unknown,{id:string,data:FormData}>(
      {
        mutationFn: async (variables) => {
          await axios.post(`http://127.0.0.1:3002/modificaGuasto/${variables.id}/${variables.data.get('new_data_rilevamento')}/${variables.data.get('new_stato')}/${variables.data.get('new_id_area_illuminata')}`, variables.data)

        },
      }
    )



  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }


  get guastiNumber() {
    return this.guastiNumberQueryResult.query();
  }
  get guasti(){
    return this.guastiQueryResult.query();
  }

  dispose() {
    this.guastiNumberQueryResult.dispose();
    this.guastiQueryResult.dispose();
    this.eliminaGuastoMutation.dispose();
    this.modificaGuastoMutation.dispose();
    this.guastoDetailsQueryResult.dispose();
    
  }
}