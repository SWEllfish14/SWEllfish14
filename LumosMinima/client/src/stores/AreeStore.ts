import { makeAutoObservable } from "mobx";
import axios from "axios";
import { MobxQuery } from "../utils/mobxqueryts";
import {
  GetAreaDetailsJTO,
  GetNumeroAreeJTO,
  GetModificaAreaJTO,
} from "../utils/api-types";
import { GetLimitAreeJTO } from "../utils/api-types";
import { GetAreeJTO } from "../utils/api-types";
import {
  QueryClient,
  QueryKey,
  QueryObserverResult,
} from "@tanstack/react-query";
import { MobxMutation } from "../utils/mobx_mutation";
import { inject } from "react-ioc";
import { FormatCodeSettings } from "typescript";
import { unstable_BlockerFunction } from "react-router-dom";
const headers = {
  "Content-Type": "application/json",
};
export default interface IAreeStore {
  areeQueryResult: MobxQuery<
    GetAreeJTO,
    unknown,
    GetAreeJTO,
    GetAreeJTO,
    QueryKey
  >;
  areeNumeroQueryResult: MobxQuery<
    GetNumeroAreeJTO,
    unknown,
    GetNumeroAreeJTO,
    GetNumeroAreeJTO,
    QueryKey
  >;
  areeLimitQueryResult: MobxQuery<
    GetLimitAreeJTO,
    unknown,
    GetLimitAreeJTO,
    GetLimitAreeJTO,
    QueryKey
  >;
  editAreaQueryResult: MobxQuery<
    GetModificaAreaJTO,
    unknown,
    GetModificaAreaJTO,
    GetModificaAreaJTO,
    QueryKey
  >;
  idAreeListaQueryResultMax:  MobxQuery<
  GetAreeJTO,
  unknown,
  GetAreeJTO,
  GetAreeJTO,
  QueryKey
  >
  aumentaLuminositàMutation: MobxMutation<
    unknown,
    unknown,
    {
      id: string;
    },
    unknown
  >;
  diminuisciLuminositàMutation: MobxMutation<
    unknown,
    unknown,
    {
      id: string;
    },
    unknown
  >;
 aggiungiAreaMutation: MobxMutation<
    unknown,
    unknown,
    {
      data: FormData
    },
    unknown
  >;
  modificaAreaMutation: MobxMutation<
    unknown,
    unknown,
    {
      id: string,
      data: FormData
    },
    unknown
  >;
  eliminaAreaMutation :MobxMutation<
  unknown,
  unknown,
  {
    id: string;
  },
  unknown
>;
  accendiAreaMutation : MobxMutation<unknown, unknown, {
    id: string;
}, unknown>

  get aree(): GetAreeJTO | undefined;
  get areeIsLoading() : boolean | undefined;
  get numeroAree() : number | undefined;
  get numeroAreeIsLoading() : boolean | undefined;
  get areeLimit() : QueryObserverResult<GetLimitAreeJTO, unknown>
  dispose: () => void;
}
export class AreeStore implements IAreeStore{
  // queryClient = inject(this, QueryClient);
  areeQueryResult = new MobxQuery<GetAreeJTO>({
    queryKey: ["aree"],
    queryFn: () => axios.get("http://localhost:3002/aree").then((r) => r.data),
  });
  areeNumeroQueryResult = new MobxQuery<GetNumeroAreeJTO>({
    queryKey: ["numeroAree"],
    queryFn: () =>
      axios.get("http://localhost:3002/numeroAree").then((r) => r.data["numeroAree"]),
  });
  areaDetailsQueryResult = new MobxQuery<GetAreaDetailsJTO>({
    queryFn: ({ queryKey }) => {
      return axios
        .get(`http://localhost:3002/area/${queryKey[1]}`)
        .then((r) => r.data);
    },
  });

  idAreeListaQueryResultMax = new MobxQuery<GetAreeJTO>({
    queryKey:['idAreeMax'],
    queryFn:() => {
      return axios
      .get(`http://localhost:3002/idAreeMax`)
      .then((r) => r.data);
  },
  })

  areeLimitQueryResult = new MobxQuery<GetLimitAreeJTO>({
    queryKey: ["areelimit"],
    queryFn: () =>
      axios.get("http://localhost:3002/areelimit").then((r) => r.data),
  });

  editAreaQueryResult = new MobxQuery<GetModificaAreaJTO>({
    queryFn: ({ queryKey }) => {
      return axios
        .get(`http://localhost:3002/area/${queryKey[1]}`)
        .then((r) => r.data);
    },
  });


  constructor(private queryClient: QueryClient) {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get aree() {
    return this.areeQueryResult.query().data;
  }

  getAreaDetails(areaId: string) {
    return this.areaDetailsQueryResult.query({
      queryKey: ["area", areaId],
    });
  }
  get numeroAree() {
    return this.areeNumeroQueryResult.query().data;
  }
  get areeLimit() {
    return this.areeLimitQueryResult.query();
  }

  get AreeIdMax(){
    return this.idAreeListaQueryResultMax.query();
  }

  get areeIsLoading(){
    return this.areeQueryResult.query().isLoading
  }

  get numeroAreeIsLoading(){
    return this.areeLimitQueryResult.query().isLoading
  }
  aumentaLuminositàMutation = new MobxMutation<
    unknown,
    unknown,
    { id: string }
  >({
    mutationFn: async (variables) => {
      await axios.post(
        `http://127.0.0.1:3002/area/${variables.id}/aumentaluminosita`
      );
    },
    onSuccess: (data, variables) => {
      this.queryClient.invalidateQueries(["area", variables.id]);
    },
  });

  diminuisciLuminositàMutation = new MobxMutation<unknown,unknown,{ id: string }>({
    mutationFn: async (variables) => {
      await axios.post(
        `http://127.0.0.1:3002/area/${variables.id}/diminuisciluminosita`
      );
    },
    onSuccess: (data, variables) => {
      this.queryClient.invalidateQueries(["area", variables.id]);
    },
  });

aggiungiAreaMutation = new MobxMutation<unknown, unknown, { data: FormData }>({
    mutationFn: async (variables) => {
      await axios.post(`http://127.0.0.1:3002/aggiungiArea/${variables.data.get('citta')}/${variables.data.get('zonaGeografica')}/${variables.data.get('modalita')}/${variables.data.get('stato')}/${variables.data.get('luminositaDefault')}/${variables.data.get('luminositaRilevamento')}`, variables.data, {
          headers,
        })
    },
  }
);
  
  
  modificaAreaMutation = new MobxMutation<unknown,unknown,{id:string,data:FormData}>(
    {
      mutationFn: async (variables) => {
        
        await axios.post(`http://127.0.0.1:3002/modificaArea/${variables.id}/${variables.data.get('citta')}/${variables.data.get('zonaGeografica')}/${variables.data.get('modalita')}/${variables.data.get('stato')}/${variables.data.get('luminositaDefault')}/${variables.data.get('luminositaRilevamento')}`, variables.data)
      },
      //onSuccess: (data, variables) => {
       // this.queryClient.invalidateQueries(["area", variables.data.get('id')]);
      //},
    }
  )

  eliminaAreaMutation = new MobxMutation<unknown,unknown,{id:string}>(
    {
      mutationFn: async (variables) => {
        await axios.post(`http://127.0.0.1:3002/eliminaArea/${variables.id}`)
      },
      onSuccess: (data, variables) => {
        this.queryClient.invalidateQueries(["aree"]);
      },
    }
  )


  cambiaModalitaMutation = new MobxMutation<unknown,unknown,{id:string}>(
    {
      mutationFn: async (variables) => {
        await axios.post(`http://127.0.0.1:3002/cambiaModalitaArea/${variables.id}`)
      },
      onSuccess: (data, variables) => {
        this.queryClient.invalidateQueries(["area",variables.id]);
      },
    }
  )

  accendiAreaMutation = new MobxMutation<unknown,unknown,{id:string}>(
    {
      mutationFn: async (variables) => {
        await axios.post(`http://127.0.0.1:3002/accendiArea/${variables.id}`)
      },
      //onSuccess: (data, variables) => {
       // this.queryClient.invalidateQueries(["area",variables.id]);
      //},
    }
  )

  accendiAllAreeMutation = new MobxMutation<unknown,unknown,unknown>(
    {
      mutationFn: async (variables) => {
        try {
          const response = await axios.post(`http://127.0.0.1:3002/accendiAllAree`);
          // You can log the response data to verify if it's what you expect
          console.log('Response:', response.data);
        } catch (error) {
          // Handle any errors that occur during the request
          console.error('Error:', error);
          throw error; // Rethrow the error to indicate a failed mutation
        }
      },
      //onSuccess: (data, variables) => {
       // this.queryClient.invalidateQueries(["area",variables.id]);
      //},
    }
  )
  
  accendiAllAree(){
    this.accendiAllAreeMutation.mutateAsync({})
  }
  

  spegniAllAreeMutation = new MobxMutation<unknown,unknown,unknown>(
    {
      mutationFn: async (variables) => {
        await axios.post(`http://127.0.0.1:3002/spegniAllAree`)
      },
      //onSuccess: (data, variables) => {
       // this.queryClient.invalidateQueries(["area",variables.id]);
      //},
    }
  )

 
  dispose() {
    this.areeQueryResult.dispose();
    this.areeNumeroQueryResult.dispose();
    this.areaDetailsQueryResult.dispose();
    this.areeLimitQueryResult.dispose();
    this.aumentaLuminositàMutation.dispose();
    this.diminuisciLuminositàMutation.dispose();
    this.aggiungiAreaMutation.dispose();
    this.modificaAreaMutation.dispose();
    this.eliminaAreaMutation.dispose();
    this.idAreeListaQueryResultMax.dispose();
    this.cambiaModalitaMutation.dispose();
  }
  
}
