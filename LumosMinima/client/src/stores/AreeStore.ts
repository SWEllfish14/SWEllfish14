
import { makeAutoObservable } from 'mobx';
import axios from "axios";
import { MobxQuery } from '../utils/mobxqueryts';
import { GetAreaDetailsJTO, GetNumeroAreeJTO } from '../utils/api-types';
import { GetLimitAreeJTO } from '../utils/api-types';
import { GetAreeJTO } from '../utils/api-types';
import { QueryKey, QueryObserverResult } from '@tanstack/react-query';


export default interface IAreeStore{
  areeQueryResult: MobxQuery<GetAreeJTO, unknown, GetAreeJTO, GetAreeJTO, QueryKey>
  areeNumeroQueryResult: MobxQuery<GetNumeroAreeJTO, unknown, GetNumeroAreeJTO, GetNumeroAreeJTO, QueryKey>
  areeLimitQueryResult:MobxQuery<GetLimitAreeJTO, unknown, GetLimitAreeJTO, GetLimitAreeJTO, QueryKey>
  get aree():QueryObserverResult<GetAreeJTO, unknown>
  dispose: ()=>void
}
export class AreeStore implements IAreeStore {
    areeQueryResult = new MobxQuery<GetAreeJTO>({
        queryKey: ['aree'],
        queryFn: () => axios.get('http://localhost:3002/aree').then((r) => r.data),
      });
      areeNumeroQueryResult = new MobxQuery<GetNumeroAreeJTO>({
        queryKey: ['numeroAree'],
        queryFn: () => axios.get('http://localhost:3002/numeroAree').then((r) => r.data),
      });
    areaDetailsQueryResult = new MobxQuery<GetAreaDetailsJTO>({
      queryFn: ({ queryKey }) => {
        return axios
          .get(`http://localhost:3002/area/${queryKey[1]}`)
          .then((r) => r.data);
      },
    });
    areeLimitQueryResult  = new MobxQuery<GetLimitAreeJTO>({
      queryKey: ['areelimit'],
      queryFn: () => axios.get('http://localhost:3002/areelimit').then((r) => r.data),
    });
    
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get aree() {
    return this.areeQueryResult.query();
  }


  getAreaDetails(areaId: string) {
    return this.areaDetailsQueryResult.query({
      queryKey: ['area', areaId],
    });
  }
  get numeroAree(){
    return this.areeNumeroQueryResult.query();
  }
  get areeLimit(){
    return this.areeLimitQueryResult.query();
  }
  
  dispose() {
    this.areeQueryResult.dispose();
    this.areeNumeroQueryResult.dispose();
    this.areaDetailsQueryResult.dispose();
    this.areeLimitQueryResult.dispose();
  }
}
