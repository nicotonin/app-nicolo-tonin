import { IsString, IsOptional, IsNotEmpty, IsNumber, Min, IsBoolean, IsIn, Matches } from "class-validator";
import { CATEGORIE } from "./corsi.entity";

export class AddCorsiDTO {
  @IsString()
  @IsNotEmpty({ message: 'Titolo should not be empty or just spaces' })
  titolo: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrizione should not be empty or just spaces' })
  descrizione: string;

  @IsString()
  @IsNotEmpty({ message: 'Categoria should not be empty' })
  @IsIn([...CATEGORIE], { message: 'Categoria non valida' })
  categoria: string;

  @IsNumber()
  @Min(1)
  durata: number;

  @IsBoolean()
  obbligatorio: boolean;

  @IsBoolean()
  attivo: boolean;
}

export class UpdateCorsiDTO {
  @IsOptional()
  @IsString()
  titolo?: string;

  @IsOptional()
  @IsString()
  descrizione?: string;

  @IsOptional()
  @IsString()
  @IsIn([...CATEGORIE], { message: 'Categoria non valida' })
  categoria?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  durata?: number;

  @IsOptional()
  @IsBoolean()
  obbligatorio?: boolean;

  @IsOptional()
  @IsBoolean()
  attivo?: boolean;
}

export class QueryListCorsiDTO {
  @IsOptional()
  @IsString()
  @IsIn([...CATEGORIE], { message: 'Categoria non valida' })
  categoria?: string;

  @IsOptional()
  @IsString()
  attivo?: string;
}