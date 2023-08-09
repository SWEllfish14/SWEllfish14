import { makeAutoObservable } from 'mobx';
import axios from "axios";
import { MobxQuery } from '../utils/mobxqueryts';
import { GetAreeJTO, GetLampioniJT0, GetNumeroLampioniJT0, GetNumeroSensoriJT0 } from '../utils/api-types';
import { QueryKey, QueryObserverResult } from '@tanstack/react-query';


export default interface ISensoriStore{
  sensoriQueryResult: MobxQuery<GetNumeroSensoriJT0, unknown, GetNumeroSensoriJT0, GetNumeroSensoriJT0, QueryKey>
  get numeroSensori():QueryObserverResult<GetNumeroSensoriJT0, unknown>
  dispose: ()=>void
}
export class SensoriStore implements ISensoriStore {
    sensoriQueryResult = new MobxQuery<GetNumeroSensoriJT0>({
        queryKey: ['numeroSensori'],
        queryFn: () => axios.get('http://localhost:3002/numeroSensori').then((r) => r.data),
      });
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get numeroSensori() {
    return this.sensoriQueryResult.query();
  }

  dispose() {
    this.sensoriQueryResult.dispose();
  }
}