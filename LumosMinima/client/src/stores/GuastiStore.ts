import { makeAutoObservable } from 'mobx';
import axios from "axios";
import { MobxQuery } from '../utils/mobxqueryts';
import { GetAreeJTO, GetNumeroGuastiJTO, GetGuastoJTO } from '../utils/api-types';
import { QueryKey, QueryObserverResult } from '@tanstack/react-query';


export default interface IGuastiStore{
  guastiNumberQueryResult: MobxQuery<GetNumeroGuastiJTO, unknown, GetNumeroGuastiJTO, GetNumeroGuastiJTO, QueryKey>
  guastiQueryResult: MobxQuery<GetGuastoJTO, unknown, GetGuastoJTO, GetGuastoJTO, QueryKey>
  get guasti():QueryObserverResult<GetGuastoJTO, unknown>
  dispose: ()=>void
}
export class GuastiStore implements IGuastiStore {
    guastiNumberQueryResult = new MobxQuery<GetNumeroGuastiJTO>({
        queryKey: ['numeroGuasti'],
        queryFn: () => axios.get('http://localhost:3002/numeroGuasti').then((r) => r.data),
      });

      guastiQueryResult = new MobxQuery<GetGuastoJTO>({
        queryKey: ['guasti'],
        queryFn: () => axios.get('http://localhost:3002/guasti').then((r) => r.data),
      });
     
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get guastiNumber() {
    return this.guastiNumberQueryResult.query();
  }
  get guasti(){
    return this.guastiQueryResult.query();
  }

  dispose() {
    this.guastiQueryResult.dispose();

  }
}