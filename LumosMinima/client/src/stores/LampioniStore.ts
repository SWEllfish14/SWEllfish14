import { makeAutoObservable } from 'mobx';
import axios from "axios";
import { MobxQuery } from '../utils/mobxqueryts';
import { GetAreeJTO, GetLampioniJT0, GetNumeroLampioniJT0 } from '../utils/api-types';
import { QueryKey, QueryObserverResult } from '@tanstack/react-query';


export default interface ILampioniStore{
  lampioniQueryResult: MobxQuery<GetNumeroLampioniJT0, unknown, GetNumeroLampioniJT0, GetNumeroLampioniJT0, QueryKey>
  get numeroLampioni():QueryObserverResult<GetNumeroLampioniJT0, unknown>

  dispose: ()=>void
}
export class LampioniStore implements ILampioniStore {
    lampioniQueryResult = new MobxQuery<GetNumeroLampioniJT0>({
        queryKey: ['numeroLampioni'],
        queryFn: () => axios.get('http://localhost:3002/numeroLampioni').then((r) => r.data),
      });

      lampioniDetailsQueryResult = new MobxQuery<GetLampioniJT0>({
        queryFn: ({ queryKey }) => {
          return axios
          .get(`http://localhost:3002/lamps/${queryKey[1]}`)
          .then((r) => r.data);
      },
    });
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get numeroLampioni() {
    return this.lampioniQueryResult.query();
  }
  getdettagliLampioni(areaId: string) {
    return this.lampioniDetailsQueryResult.query({
      queryKey: ['lamps', areaId],
    });
  }

  /*get dettagliLampioni() {
    return this.lampioniDetailsQueryResult.query();
  }
  */


  dispose() {
    this.lampioniQueryResult.dispose();
    this.lampioniDetailsQueryResult.dispose();
  }
}