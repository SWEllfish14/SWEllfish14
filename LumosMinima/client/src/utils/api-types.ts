type AreaJTO = { ID: number; città: string; zona_geografica_città: string ;modalità_funzionamento: string; luminosità_standard: number;luminosità_rilevamento: string, luminosità_manuale: string};


type GuastoJTO = {ID: number; data_rilevamento: Date; stato: string, id_area_illuminata: number };


type LampioniJTO = {IP: number; ID: number; polling_time: number; status: number;iterazione:string;luminosita_default: number; luminosita_impostata: number;id_area_illuminata: number };


type SensoriJTO = {ID: number; IP: number; polling_time: number; zona_geografica_posizionamento: string;tipo_iterazione:string;raggio_azione: number; id_area_illuminata: number};

export type GetNumeroLampioniJT0 = number;
export type GetLampioniJT0 = Array<LampioniJTO>;

export type GetNumeroAreeJTO = number;
export type GetLimitAreeJTO = Array<AreaJTO>;
export type GetAreeJTO = Array<AreaJTO>;
export type GetAreaDetailsJTO = AreaJTO;

export type GetNumeroGuastiJTO = number;
export type GetGuastoJTO = Array<GuastoJTO>;

export type GetNumeroSensoriJT0 = number;
export type GetSensoriJTO = Array<SensoriJTO>;