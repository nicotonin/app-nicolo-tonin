export type Assegnazioni = {
  id?: string;
  corsoId: string;
  dipendenteId: string;
  dataAssegnazione: string;
  dataScadenza: string;
  stato: string;
  dataCompletamento?: string | null;
};

export type AssegnazioniFilters = {
  stato?: string;
  categoria?: string;
  corsoId?: string;
  dipendenteId?: string;
};
