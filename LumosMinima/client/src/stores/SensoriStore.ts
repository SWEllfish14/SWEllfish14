import { makeAutoObservable } from 'mobx';
import axios from "axios";
import { MobxQuery } from '../utils/mobxqueryts';
import { GetSensoriJTO, GetNumeroSensoriJT0, GetDettagliSensoriJTO } from '../utils/api-types';
import { QueryKey, QueryObserverResult } from '@tanstack/react-query';


export default interface ISensoriStore{
  sensoriQueryResult: MobxQuery<GetNumeroSensoriJT0, unknown, GetNumeroSensoriJT0, GetNumeroSensoriJT0, QueryKey>
  get numeroSensori():QueryObserverResult<GetNumeroSensoriJT0, unknown>
  getlistaSensori(areaId: string): QueryObserverResult<GetSensoriJTO, unknown>
  getdettagliSensori(sensore_id: string): QueryObserverResult<GetDettagliSensoriJTO, unknown>
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

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get numeroSensori() {
    return this.sensoriQueryResult.query();
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
  dispose() {
    this.sensoriQueryResult.dispose();
    this.sensoriListaQueryResult.dispose();
  }
}