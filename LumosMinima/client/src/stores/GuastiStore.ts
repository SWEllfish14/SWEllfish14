import { makeAutoObservable } from 'mobx';
import axios from "axios";
import { MobxQuery } from '../utils/mobxqueryts';
import { GetAreeJTO, GetGuastiJTO } from '../utils/api-types';
import { QueryKey, QueryObserverResult } from '@tanstack/react-query';


export default interface IGuastiStore{
  guastiQueryResult: MobxQuery<GetGuastiJTO, unknown, GetGuastiJTO, GetGuastiJTO, QueryKey>
  get guasti():QueryObserverResult<GetGuastiJTO, unknown>
  dispose: ()=>void
}
export class GuastiStore implements IGuastiStore {
    guastiQueryResult = new MobxQuery<GetGuastiJTO>({
        queryKey: ['guasti'],
        queryFn: () => axios.get('http://localhost:3002/guasti').then((r) => r.data),
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