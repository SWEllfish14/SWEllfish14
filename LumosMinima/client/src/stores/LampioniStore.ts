import { makeAutoObservable } from 'mobx';
import axios from "axios";
import { MobxQuery } from '../utils/mobxqueryts';
import { GetAreeJTO, GetLampioniJTO, GetNumeroLampioniJT0 } from '../utils/api-types';
import { QueryKey, QueryObserverResult } from '@tanstack/react-query';


export default interface ILampioniStore{
  lampioniQueryResult: MobxQuery<GetNumeroLampioniJT0, unknown, GetNumeroLampioniJT0, GetNumeroLampioniJT0, QueryKey>
  get numeroLampioni():QueryObserverResult<GetNumeroLampioniJT0, unknown>
  dispose: ()=>void
}
export class LampioniStore implements ILampioniStore {
    lampioniQueryResult = new MobxQuery<GetNumeroLampioniJT0>({
        queryKey: ['numerolampioni'],
        queryFn: () => axios.get('http://localhost:3002/numerolampioni').then((r) => r.data),
      });
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get numeroLampioni() {
    return this.lampioniQueryResult.query();
  }

  dispose() {
    this.lampioniQueryResult.dispose();
  }
}