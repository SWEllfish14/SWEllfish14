import { makeAutoObservable } from 'mobx';
import axios from "axios";
import { MobxQuery } from '../utils/mobxqueryts';
import { GetAreeJTO, GetNumeroGuastiJTO } from '../utils/api-types';
import { QueryKey, QueryObserverResult } from '@tanstack/react-query';


export default interface IGuastiStore{
  guastiQueryResult: MobxQuery<GetNumeroGuastiJTO, unknown, GetNumeroGuastiJTO, GetNumeroGuastiJTO, QueryKey>
  get guasti():QueryObserverResult<GetNumeroGuastiJTO, unknown>
  dispose: ()=>void
}
export class GuastiStore implements IGuastiStore {
    guastiQueryResult = new MobxQuery<GetNumeroGuastiJTO>({
        queryKey: ['numeroGuasti'],
        queryFn: () => axios.get('http://localhost:3002/numeroGuasti').then((r) => r.data),
      });
     
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get guasti() {
    return this.guastiQueryResult.query();
  }
  dispose() {
    this.guastiQueryResult.dispose();

  }
}