import { makeAutoObservable } from 'mobx';
import axios from "axios";
import { MobxQuery } from '../utils/mobxqueryts';
import {  GetNumeroGuastiJTO, GetGuastoJTO, GetGuastoDetailsJTO } from '../utils/api-types';
import { QueryKey,QueryClient, QueryObserverResult } from '@tanstack/react-query';
import { MobxMutation } from '../utils/mobx_mutation';
import { inject } from 'react-ioc';

const headers = {
  "Content-Type": "application/json",
};
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
  aggiungiGuastoMutation: MobxMutation<
  unknown,
  unknown,
  {
    data: FormData
  },
  unknown
  >;

  chiudiGuastoMutation :MobxMutation<
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
        queryFn: () => axios.get('http://localhost:3002/guastiAperti').then((r) => r.data),
      });

      guastiApertiQueryResult = new MobxQuery<GetGuastoJTO>({
        queryKey: ['guastiAperti'],
        queryFn: () => axios.get('http://localhost:3002/guastiAperti').then((r) => r.data),
      });

      guastiChiusiQueryResult = new MobxQuery<GetGuastoJTO>({
        queryKey: ['guastiChiusi'],
        queryFn: () => axios.get('http://localhost:3002/guastiChiusi').then((r) => r.data),
      });

      guastoDetailsQueryResult = new MobxQuery<GetGuastoDetailsJTO>({
        queryFn: ({ queryKey }) => {
          return axios
            .get(`http://localhost:3002/guasti/${queryKey[1]}`)
            .then((r) => r.data);
        },
      });

      getGuastiAperti() {
        return this.guastiApertiQueryResult.query({
          queryKey: ['guastiAperti'],
        });
      }

      getGuastiChiusi() {
        return this.guastiChiusiQueryResult.query({
          queryKey: ['guastiChiusi'],
        });
      }
      
      getGuastoDetails(guastoId: string) {
        return this.guastoDetailsQueryResult.query({
          queryKey: ["guasti", guastoId],
        });
      }

    chiudiGuastoMutation = new MobxMutation<unknown,unknown,{id:string}>(
      {
        mutationFn: async (variables) => {
          await axios.post(`http://127.0.0.1:3002/chiudiGuasto/${variables.id}`)
        },
        onSuccess: (data, variables) => {
          this.queryClient.invalidateQueries(["aree"]);
        },
      }
    )

    modificaGuastoMutation = new MobxMutation<unknown,unknown,{id:string,data:FormData}>(
      {
        mutationFn: async (variables) => {
          /* console.log(`http://127.0.0.1:3002/modificaGuasto/${variables.id}/${variables.data.get('new_stato')}/${variables.data.get('new_note') ? variables.data.get('new_note') : "null" }/${variables.data.get('new_id_area_illuminata')}`); */
          await axios.post(`http://127.0.0.1:3002/modificaGuasto/${variables.id}/${variables.data.get('new_stato')}/${variables.data.get('new_note') ? variables.data.get('new_note') : "null" }/${variables.data.get('new_id_area_illuminata')}`, variables.data)
          
        },
      }
    )

    aggiungiGuastoMutation = new MobxMutation<unknown,unknown,{data:FormData}>(
      {
        mutationFn: async (variables) => {
          //console.log(`http://127.0.0.1:3002/aggiungiGuasto/${variables.data.get('dataRilevamento')}/${variables.data.get('stato')}/${variables.data.get('note')}/${variables.data.get('id_area')}`);
          await axios.post(`http://127.0.0.1:3002/aggiungiGuasto/${variables.data.get('dataRilevamento')}/${variables.data.get('stato')}/${variables.data.get('note')}/${variables.data.get('id_area')}`, variables.data, {
            headers,
          })
          
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

  submitError = '';
  setSubmitError(error: string) {
    this.submitError = error;
  }

  clearSubmitError() {
    this.submitError = '';
  }
 

  dispose() {
    this.guastiNumberQueryResult.dispose();
    this.guastiQueryResult.dispose();
    this.guastiApertiQueryResult.dispose();
    this.guastiChiusiQueryResult.dispose();
    this.chiudiGuastoMutation.dispose();
    this.modificaGuastoMutation.dispose();
    this.guastoDetailsQueryResult.dispose();
    
  }
}