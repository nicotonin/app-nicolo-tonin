import { User } from "../user/user.entity";

export const STATI_ASSEGNAZIONE = ['assegnato', 'completato', 'scaduto', 'annullato'] as const;
export type StatoAssegnazione = typeof STATI_ASSEGNAZIONE[number];

export type Assegnazioni = {
  id?: string;
  corsoId: string;
  dipendenteId: User | string;
  dataAssegnazione: Date;
  dataScadenza: Date;
  stato: StatoAssegnazione;
  dataCompletamento?: Date | null;
};

export type AssegnazioniFilters = {
  stato?: StatoAssegnazione;
  categoria?: string;
  corsoId?: string;
  dipendenteId?: string;
};