import { makeAutoObservable } from 'mobx';
import axios from "axios";
import { MobxQuery } from '../utils/mobxqueryts';
import { GetSensoriJTO, GetNumeroSensoriJT0 } from '../utils/api-types';
import { QueryKey, QueryObserverResult } from '@tanstack/react-query';
import { inject } from 'react-ioc';


export default interface ISensoriStore{
  sensoriQueryResult: MobxQuery<GetNumeroSensoriJT0, unknown, GetNumeroSensoriJT0, GetNumeroSensoriJT0, QueryKey>
  get numeroSensori():QueryObserverResult<GetNumeroSensoriJT0, unknown>
  getdettagliSensori(areaId: string): QueryObserverResult<GetSensoriJTO, unknown>
  dispose: ()=>void
}
export class SensoriStore implements ISensoriStore {
    sensoriQueryResult = new MobxQuery<GetNumeroSensoriJT0>({
        queryKey: ['numeroSensori'],
        queryFn: () => axios.get('http://localhost:3002/numeroSensori').then((r) => r.data),
      });

      sensoriDetailsQueryResult = new MobxQuery<GetSensoriJTO>({
        queryFn: ({ queryKey }) => {
          return axios
          .get(`http://localhost:3002/sensori/${queryKey[1]}`)
          .then((r) => r.data);
      },
    });

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get numeroSensori() {
    return this.sensoriQueryResult.query();
  }

  getdettagliSensori(areaId: string) {
    return this.sensoriDetailsQueryResult.query({
      queryKey: ['area', areaId],
    });
  }
  dispose() {
    this.sensoriQueryResult.dispose();
    this.sensoriDetailsQueryResult.dispose();
  }
}