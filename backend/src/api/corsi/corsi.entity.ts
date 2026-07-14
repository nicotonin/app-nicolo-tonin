export type Corsi = {
  id?: string;
  titolo: string;
  descrizione: string;
  categoria: string;
  durata: number;
  obbligatorio: boolean;
  attivo: boolean;
};

export type CorsiFilters = {
  categoria?: string;
  attivo?: boolean;
};