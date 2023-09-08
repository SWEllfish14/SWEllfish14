import { makeAutoObservable } from 'mobx';
import axios from "axios";
import { MobxQuery } from '../utils/mobxqueryts';
import { GetLampioniJT0, GetNumeroLampioniJT0 , GetLampioneJT0, GetNumeroLampioniAreaJTO} from '../utils/api-types';

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
  numeroLampioniAreaQueryResult: MobxQuery<GetNumeroLampioniAreaJTO, unknown, GetNumeroLampioniAreaJTO, GetNumeroLampioniAreaJTO, QueryKey>
  getlistaLampioni(areaId: string): QueryObserverResult<GetLampioniJT0, unknown>
  getdettagliLampioni(lampId: string): QueryObserverResult<GetLampioneJT0, unknown>
  aggiungiLampioneMutation: MobxMutation<unknown,unknown,{ data2: FormData},unknown>;
  get numeroLampioni():QueryObserverResult<GetNumeroLampioniJT0, unknown>
  getnumeroLampioniArea(areaId:string):QueryObserverResult<GetNumeroLampioniAreaJTO, unknown>
  deleteLampioneMutation :MobxMutation<unknown,unknown,{id: string;},unknown>;
  modificaLampioneMutation :MobxMutation<unknown,unknown,{data:FormData},unknown>;
  accendiLampioniAreaMutation : MobxMutation<unknown, unknown, {
    id: string;
  }, unknown>;

  spegniLampioniAreaMutation : MobxMutation<unknown, unknown, {
    id: string;
  }, unknown>;
  
  accendiLampioneMutation :  MobxMutation<unknown, unknown, {
    lampID: string;
  }, unknown>;

  spegniLampioneMutation :  MobxMutation<unknown, unknown, {
    lampID: string;
  }, unknown>;
  dispose: ()=>void
 
}
export class LampioniStore implements ILampioniStore {
  
  queryClient = inject(this, QueryClient);
    lampioniQueryResult = new MobxQuery<GetNumeroLampioniJT0>({
        queryKey: ['numeroLampioni'],
        queryFn: () => axios.get('http://localhost:3002/numeroLampioni').then((r) => r.data["numeroLampioni"]),
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

  numeroLampioniAreaQueryResult = new MobxQuery<GetNumeroLampioniAreaJTO>({
    queryKey:['numeroLampioniArea'],
    queryFn: ({ queryKey }) => {
      return axios
      .get(`http://localhost:3002/numeroLampioniArea/${queryKey[1]}`)
      .then((r) => r.data["numeroLampioniArea"]);
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

aggiungiLampioneMutation = new MobxMutation<unknown, unknown, {data2: FormData }>({
    mutationFn: async (variables) => {
      await axios.post(`http://127.0.0.1:3002/aggiungiLampione/${variables.data2.get('area')}/${variables.data2.get('ip')}/${variables.data2.get('tipo_interazione')}/${variables.data2.get('luminositaDefault')}/${variables.data2.get('luminositaManuale')}/${variables.data2.get('stato')}`, variables.data2, {headers})
    },
  }
);
 

  deleteLampioneMutation = new MobxMutation<unknown,unknown,{id:string}>(
    {
      mutationFn: async (variables) => {
        await axios.post(`http://127.0.0.1:3002/eliminaLampione/${variables.id}`)
      },
      onSuccess: (data, variables) => {
        this.queryClient.invalidateQueries(["eliminaLampione",variables.id]);
      },
    }
  );

  modificaLampioneMutation = new MobxMutation<unknown,unknown,{data:FormData}>(
    {
      mutationFn: async (variables) => {
        await axios.post(`http://127.0.0.1:3002/modificaLampione/${variables.data.get('id')}/${variables.data.get('ip')}/${variables.data.get('tipo_interazione')}/${variables.data.get('luminositaDefault')}/${variables.data.get('luminositaManuale')}/${variables.data.get('stato')}`)
      },
    }
  );

  accendiLampioniAreaMutation = new MobxMutation<unknown,unknown,{id:string}>(
    {
      mutationFn: async (variables) => {
        await axios.post(`http://127.0.0.1:3002/accendiLampioniArea/${variables.id}`)
      },
      //onSuccess: (data, variables) => {
       // this.queryClient.invalidateQueries(["area",variables.id]);
      //},
    }
  );

  spegniLampioniAreaMutation = new MobxMutation<unknown,unknown,{id:string}>(
    {
      mutationFn: async (variables) => {
        await axios.post(`http://127.0.0.1:3002/spegniLampioniArea/${variables.id}`)
      },
      //onSuccess: (data, variables) => {
       // this.queryClient.invalidateQueries(["area",variables.id]);
      //},
    }
  );

  accendiLampioneMutation = new MobxMutation<unknown,unknown,{lampID:string}>(
    {
      mutationFn: async (variables) => {
        await axios.post(`http://127.0.0.1:3002/accendiLampione/${variables.lampID}`)
      },
      onSuccess: (data, variables) => {
        //this.queryClient.invalidateQueries(["lamps",variables.lampID]);
      },
    }
  );
  
  spegniLampioneMutation  = new MobxMutation<unknown,unknown,{lampID:string}>(
    {
      mutationFn: async (variables) => {
        await axios.post(`http://127.0.0.1:3002/spegniLampione/${variables.lampID}`)
      },
      onSuccess: (data, variables) => {
       // this.queryClient.invalidateQueries(["lamps",variables.lampID]);
      },
    }
  );

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get numeroLampioni() {
    return this.lampioniQueryResult.query();
  }
  getnumeroLampioniArea(areaId: string) {
    return this.numeroLampioniAreaQueryResult.query({
      queryKey: ['numeroLampioniArea', areaId],
    });
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
 
submitError = '';
setSubmitError(error: string) {
  this.submitError = error;
}

clearSubmitError() {
  this.submitError = '';
}
  dispose() {
    this.lampioniQueryResult.dispose();
    this.lampioniListaQueryResult.dispose();
    this.lampioniDettagliQueryResult.dispose();
    this.deleteLampioneMutation.dispose();    
    //this.aggiungiLampioneMutation.dispose();
    this.spegniLampioniAreaMutation.dispose();
  }
}