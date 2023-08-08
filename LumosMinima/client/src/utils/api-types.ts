type AreaJTO = { ID: number; zona_geografica: string; stato: number ;luminosita_impostata: number; luminosita_default: number;user_amministratore: string};
export type GetAreeJTO = Array<AreaJTO>;

type GuastoJTO = {ID: number; zona_geografica: string; id_area_illuminata: number }
export type GetGuastiJTO = Array<GuastoJTO>;

type LampioniJTO = {IP: number; ID: number; polling_time: number; status: number;iterazione:string;luminosita_default: number; luminosita_impostata: number;id_area_illuminata: number }
export type GetLampioniJTO = Array<LampioniJTO>;

export type GetNumeroLampioniJT0 = number