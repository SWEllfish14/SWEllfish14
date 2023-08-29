type AreaJTO = { ID: number; città: string; zona_geografica_città: string ;modalità_funzionamento: string; luminosità_standard: number;luminosità_rilevamento: string, luminosità_manuale: string, stato : number};


type GuastoJTO = {ID: number; data_rilevamento: Date; stato: string, note:string, id_area_illuminata: number , "area.città": string, "area.zona_geografica_città": string, data_risoluzione: Date};
type LampioniJTO = {IP: number; ID: string;tipo_interazione:string;luminosita_default: string; luminosita_impostata: string;id_area_illuminata: number, stato:boolean };


type SensoriJTO = {ID: string; IP: string; polling_time: number; zona_geografica_posizionamento: string;tipo_interazione:string;raggio_azione: number; id_area_illuminata: number};

export type GetNumeroLampioniJT0 = number;
export type GetNumeroLampioniAreaJTO = number;
export type GetLampioniJT0 = Array<LampioniJTO>;
export type GetLampioneJT0 = LampioniJTO;

export type GetNumeroAreeJTO = number;
export type GetLimitAreeJTO = Array<AreaJTO>;
export type GetAreeJTO = Array<AreaJTO>;
export type GetAreaDetailsJTO = AreaJTO;
export type GetModificaAreaJTO = AreaJTO;

export type GetNumeroGuastiJTO = number;
export type GetGuastoJTO = Array<GuastoJTO>;
export type GetGuastoDetailsJTO = GuastoJTO;
export type GetModificaGuastoJTO = GuastoJTO;

export type GetNumeroSensoriJT0 = number;
export type GetNumeroSensoriAreaJT0 = number;
export type GetSensoriJTO = Array<SensoriJTO>;
export type GetDettagliSensoriJTO = SensoriJTO;