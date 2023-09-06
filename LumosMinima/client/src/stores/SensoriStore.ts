import { makeAutoObservable } from 'mobx';
import axios from "axios";
import { MobxQuery } from '../utils/mobxqueryts';
import { GetSensoriJTO, GetNumeroSensoriJT0, GetDettagliSensoriJTO , GetNumeroSensoriAreaJT0} from '../utils/api-types';
import { QueryKey, QueryObserverResult } from '@tanstack/react-query';
import { MobxMutation } from "../utils/mobx_mutation";
const headers = {
  "Content-Type": "application/json",
};
export default interface ISensoriStore{
  sensoriQueryResult: MobxQuery<GetNumeroSensoriJT0, unknown, GetNumeroSensoriJT0, GetNumeroSensoriJT0, QueryKey>
  get numeroSensori():QueryObserverResult<GetNumeroSensoriJT0, unknown>
  getnumeroSensoriArea(areaId:string):QueryObserverResult<GetNumeroSensoriAreaJT0, unknown>
  numeroSensoriAreaQueryResult: MobxQuery<GetNumeroSensoriAreaJT0, unknown, GetNumeroSensoriAreaJT0, GetNumeroSensoriAreaJT0, QueryKey>
  getlistaSensori(areaId: string): QueryObserverResult<GetSensoriJTO, unknown>
  getdettagliSensori(sensore_id: string): QueryObserverResult<GetDettagliSensoriJTO, unknown>
  aggiungiSensoreMutation: MobxMutation<unknown,unknown,{data: FormData},unknown>;
  modificaSensoreMutation: MobxMutation<unknown,unknown,{id: string,data: FormData},unknown>;
  eliminaSensoreMutation: MobxMutation<unknown,unknown,{id: string},unknown>;
  dispose: ()=>void
}
export class SensoriStore implements ISensoriStore {
    sensoriQueryResult = new MobxQuery<GetNumeroSensoriJT0>({
        queryKey: ['numeroSensori'],
        queryFn: () => axios.get('http://localhost:3002/numeroSensori').then((r) => r.data["numeroSensori"]),
      });

      sensoriListaQueryResult = new MobxQuery<GetSensoriJTO>({
        queryFn: ({ queryKey }) => {
          return axios
          .get(`http://localhost:3002/sensori/${queryKey[1]}`)
          .then((r) => r.data);
      },
    });

    sensoriDettagliQueryResult = new MobxQuery<GetDettagliSensoriJTO>({
      queryFn: ({ queryKey }) => {
        return axios
        .get(`http://localhost:3002/sensore/${queryKey[1]}`)
        .then((r) => r.data);
    },
  });

  numeroSensoriAreaQueryResult = new MobxQuery<GetNumeroSensoriAreaJT0>({
    queryKey:['numeroSensoriArea'],
    queryFn: ({ queryKey }) => {
      return axios
      .get(`http://localhost:3002/numeroSensoriArea/${queryKey[1]}`)
      .then((r) => r.data["numeroSensoriArea"]);
  },
});

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get numeroSensori() {
    return this.sensoriQueryResult.query();
  }

  getnumeroSensoriArea(areaId: string) {
    return this.numeroSensoriAreaQueryResult.query(
      {
        queryKey: ['area', areaId],
      }
    );
  }

  getlistaSensori(areaId: string) {
    return this.sensoriListaQueryResult.query({
      queryKey: ['sensori', areaId],
    });
  }
  getdettagliSensori(sensore_id: string) {
    return this.sensoriDettagliQueryResult.query({
      queryKey: ['sensore', sensore_id],
    });
  }

  aggiungiSensoreMutation = new MobxMutation<unknown, unknown, { data: FormData }, unknown>({
      mutationFn: async (variables) => {
       console.log(variables)
        await axios.post(`http://127.0.0.1:3002/aggiungiSensore/${variables.data.get('ip')}/${variables.data.get('polling')}/${variables.data.get('zona_geografica')}/${variables.data.get('tipo_interazione')}/${variables.data.get('raggio_azione')}/${variables.data.get('id_area')}`, variables.data, {headers,})
      },
    }
  )
  modificaSensoreMutation = new MobxMutation<unknown, unknown, {id: string, data: FormData }, unknown>({
    mutationFn: async (variables) => {
      await axios.post(`http://127.0.0.1:3002/modificaSensore/${variables.id}/${variables.data.get('ip')}/${variables.data.get('polling_time')}/${variables.data.get('zona_geografica')}/${variables.data.get('tipo_interazione')}/${variables.data.get('raggio_azione')}`, variables.data)
    },
  }
)

eliminaSensoreMutation = new MobxMutation<unknown, unknown, {id: string}, unknown>({
  mutationFn: async (variables) => {
    await axios.post(`http://127.0.0.1:3002/eliminaSensore/${variables.id}`)
  },
  
}
)
   
  dispose() {
    this.sensoriQueryResult.dispose();
    this.sensoriListaQueryResult.dispose();
    this.aggiungiSensoreMutation.dispose();
    this.modificaSensoreMutation.dispose();
    this.eliminaSensoreMutation.dispose();
  }
}