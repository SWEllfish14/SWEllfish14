
import { makeAutoObservable } from 'mobx';
import axios from "axios";
import { MobxQuery } from '../utils/mobxqueryts';
import { GetAreeJTO } from '../utils/api-types';
import { QueryKey, QueryObserverResult } from '@tanstack/react-query';


export default interface IAreeStore{
  areeQueryResult: MobxQuery<GetAreeJTO, unknown, GetAreeJTO, GetAreeJTO, QueryKey>
  areeLimitQueryResult:MobxQuery<GetAreeJTO, unknown, GetAreeJTO, GetAreeJTO, QueryKey>
  get aree():QueryObserverResult<GetAreeJTO, unknown>
  dispose: ()=>void
}
export class AreeStore implements IAreeStore {
    areeQueryResult = new MobxQuery<GetAreeJTO>({
        queryKey: ['aree'],
        queryFn: () => axios.get('http://localhost:3002/aree').then((r) => r.data),
      });
      areeLimitQueryResult  = new MobxQuery<GetAreeJTO>({
        queryKey: ['aree'],
        queryFn: () => axios.get('http://localhost:3002/areelimit').then((r) => r.data),
      });
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get aree() {
    return this.areeQueryResult.query();
  }

  get areeLimit(){
    return this.areeLimitQueryResult.query();
  }
  dispose() {
    this.areeQueryResult.dispose();
    this.areeLimitQueryResult.dispose();
  }
}
