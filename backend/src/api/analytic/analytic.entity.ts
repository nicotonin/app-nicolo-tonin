import { Categoria } from "../corsi/corsi.entity";

export type StatisticaRiepilogo = {
  mese: string;
  categoria: string;
  numeroAssegnazioni: number;
  numeroCompletamenti: number;
  percentualeCompletamento: number;
};

export type QueryStatisticheFilters = {
  mese?: string;
  categoria?: Categoria;
  dipendenteId?: string;
};