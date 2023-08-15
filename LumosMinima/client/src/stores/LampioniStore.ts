import { makeAutoObservable } from 'mobx';
import axios from "axios";
import { MobxQuery } from '../utils/mobxqueryts';
import { GetLampioniJT0, GetNumeroLampioniJT0 } from '../utils/api-types';

import { MutationObserverResult, QueryClient, QueryKey, QueryObserverResult } from '@tanstack/react-query';
import { MobxMutation } from '../utils/mobx_mutation';
import { inject } from 'react-ioc';


export default interface ILampioniStore{
  lampioniQueryResult: MobxQuery<GetNumeroLampioniJT0, unknown, GetNumeroLampioniJT0, GetNumeroLampioniJT0, QueryKey>
  lampioniDetailsQueryResult: MobxQuery<GetLampioniJT0, unknown, GetLampioniJT0, GetLampioniJT0, QueryKey>
  getdettagliLampioni(areaId: string): QueryObserverResult<GetLampioniJT0, unknown>
  geteliminaLampione(lampID: number): MutationObserverResult<unknown, unknown>

  get numeroLampioni():QueryObserverResult<GetNumeroLampioniJT0, unknown>
  dispose: ()=>void
}
export class LampioniStore implements ILampioniStore {
  queryClient = inject(this, QueryClient);
    lampioniQueryResult = new MobxQuery<GetNumeroLampioniJT0>({
        queryKey: ['numeroLampioni'],
        queryFn: () => axios.get('http://localhost:3002/numeroLampioni').then((r) => r.data),
      });

      lampioniDetailsQueryResult = new MobxQuery<GetLampioniJT0>({
        queryKey:['lamps'],
        queryFn: ({ queryKey }) => {
          return axios
          .get(`http://localhost:3002/lamps/${queryKey[1]}`)
          .then((r) => r.data);
      },
    });

    deleteLampioneMutation = new MobxMutation<unknown,unknown,{lampID: number}>({
      mutationFn: async (variables) => {
        await axios.post(`http://127.0.0.1:3002/eliminaLampione/${variables.lampID}`);
      },
      onSuccess: (data, variables) => {
        this.queryClient.invalidateQueries(['lamps']);
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

  geteliminaLampione(lampID: number) {
    return this.deleteLampioneMutation.mutate({
      lampID
    });
  }

 

  dispose() {
    this.lampioniQueryResult.dispose();
    this.lampioniDetailsQueryResult.dispose();
  }
}