import { makeAutoObservable } from 'mobx';
import axios from "axios";
import { MobxQuery } from '../utils/mobxqueryts';
import { GetLampioniJT0, GetNumeroLampioniJT0 , GetLampioneJT0} from '../utils/api-types';

import { MutationObserverResult, QueryClient, QueryKey, QueryObserverResult } from '@tanstack/react-query';
import { MobxMutation } from '../utils/mobx_mutation';
import { inject } from 'react-ioc';

const headers = {
  "Content-Type": "application/json",
};
export default interface ILampioniStore{
  lampioniQueryResult: MobxQuery<GetNumeroLampioniJT0, unknown, GetNumeroLampioniJT0, GetNumeroLampioniJT0, QueryKey>
  lampioniListaQueryResult: MobxQuery<GetLampioniJT0, unknown, GetLampioniJT0, GetLampioniJT0, QueryKey>
  lampioniDettagliQueryResult: MobxQuery<GetLampioneJT0, unknown, GetLampioneJT0, GetLampioneJT0, QueryKey>
  getlistaLampioni(areaId: string): QueryObserverResult<GetLampioniJT0, unknown>
  getdettagliLampioni(lampId: string): QueryObserverResult<GetLampioneJT0, unknown>
  aggiungiLampioneMutation: MobxMutation<unknown,unknown,{ data2: FormData},unknown>;
  get numeroLampioni():QueryObserverResult<GetNumeroLampioniJT0, unknown>
  deleteLampioneMutation :MobxMutation<unknown,unknown,{lampID: string;},unknown>;
  modificaLampioneMutation :MobxMutation<unknown,unknown,{data:FormData},unknown>;
  dispose: ()=>void
}
export class LampioniStore implements ILampioniStore {
  queryClient = inject(this, QueryClient);
    lampioniQueryResult = new MobxQuery<GetNumeroLampioniJT0>({
        queryKey: ['numeroLampioni'],
        queryFn: () => axios.get('http://localhost:3002/numeroLampioni').then((r) => r.data),
      });

      lampioniListaQueryResult = new MobxQuery<GetLampioniJT0>({
        queryKey:['lamps'],
        queryFn: ({ queryKey }) => {
          return axios
          .get(`http://localhost:3002/lamps/${queryKey[1]}`)
          .then((r) => r.data);
      },
    });

    lampioniDettagliQueryResult = new MobxQuery<GetLampioneJT0>({
      queryKey:['lampione'],
      queryFn: ({ queryKey }) => {
        return axios
        .get(`http://localhost:3002/lampione/${queryKey[1]}`)
        .then((r) => r.data);
    },
  });

  /*addLampioneQueryResult = new MobxQuery<GetLampioneJT0>({
    queryKey: ['aggiungiLampione'],
    queryFn: () => {
      return axios
      .get(`http://localhost:3002/aggiungiLampione`)
      .then((r) => r.data);
  },

  });
*/

aggiungiLampioneMutation = new MobxMutation<unknown, unknown, { data2: FormData }>({
    mutationFn: async (variables) => {
      await axios.post(`http://127.0.0.1:3002/aggiungiLampione/${variables.data2.get('IP')}/${variables.data2.get('tipo_interazione')}/${variables.data2.get('luminositaDefault')}/${variables.data2.get('luminositaManuale')}/${variables.data2.get('stato')}}`, variables.data2, {headers})
    },
  }
);
 

  deleteLampioneMutation = new MobxMutation<unknown,unknown,{lampID:string}>(
    {
      mutationFn: async (variables) => {
        await axios.post(`http://127.0.0.1:3002/eliminaLampione/${variables.lampID}`)
      },
      onSuccess: (data, variables) => {
        this.queryClient.invalidateQueries(["eliminaLampione",variables.lampID]);
      },
    }
  );

  modificaLampioneMutation = new MobxMutation<unknown,unknown,{data:FormData}>(
    {
      mutationFn: async (variables) => {
        await axios.post(`http://127.0.0.1:3002/modificaLampione/${variables.data.get('id')}/${variables.data.get('ip')}/${variables.data.get('tipo_interazione')}/${variables.data.get('luminositaDefault')}/${variables.data.get('luminositaImpostata')}/${variables.data.get('id_area')}/${variables.data.get('stato')}`)
      },
      onSuccess: (data, variables) => {
        //this.queryClient.invalidateQueries(["eliminaLampione",variables.lampID]);
      },
    }
  );


  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get numeroLampioni() {
    return this.lampioniQueryResult.query();
  }

  getlistaLampioni(areaId: string) {
    return this.lampioniListaQueryResult.query({
      queryKey: ['lamps', areaId],
    });
  }

 /* getaggiuntaLampione(lampID: string, lampIP: string, tipo_interazione: string, luminosità_default: number, luminosità_rilevamento: number, id_area_illuminata: number): QueryObserverResult<{ IP: number; ID: string; tipo_iterazione: string; luminosita_default: number; luminosita_impostata: number; id_area_illuminata: number; }, unknown> {
    return this.addLampioneQueryResult.query({
      queryKey: ['aggiungiLampione', lampID, lampIP, tipo_interazione, luminosità_default, luminosità_rilevamento, id_area_illuminata],
    })
  }
  */

  getdettagliLampioni(lampId: string) {
    return this.lampioniDettagliQueryResult.query({
      queryKey: ['lamps', lampId],
    });
  }

  /*geteliminaLampione(lampID: string) {
    return this.deleteLampioneMutation.mutate({
      lampID
    });
  }
*/
 

  dispose() {
    this.lampioniQueryResult.dispose();
    this.lampioniListaQueryResult.dispose();
    this.lampioniDettagliQueryResult.dispose();
    this.deleteLampioneMutation.dispose();    
    this.aggiungiLampioneMutation.dispose();
  }
}