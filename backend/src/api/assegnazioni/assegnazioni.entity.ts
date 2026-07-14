import { User } from "../user/user.entity";

export type Assegnazioni = {
  id?: string;
  corsoId: string;
  dipendenteId: User | string;
  dataAssegnazione: Date;
  dataScadenza: Date;
  stato: string;
  dataCompletamento?: Date;
};