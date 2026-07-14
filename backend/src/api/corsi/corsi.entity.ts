export const CATEGORIE = [
  'Sicurezza',
  'Informatica',
  'Lingue',
  'Management',
  'Compliance',
  'Soft Skills',
  'Tecnico-Professionale',
  'Qualità'
] as const;

export type Categoria = typeof CATEGORIE[number];

export type Corsi = {
  id?: string;
  titolo: string;
  descrizione: string;
  categoria: Categoria;
  durata: number;
  obbligatorio: boolean;
  attivo: boolean;
};

export type CorsiFilters = {
  categoria?: Categoria;
  attivo?: boolean;
};