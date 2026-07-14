import { IsString, IsOptional, IsNotEmpty, IsMongoId, IsDate, IsIn } from "class-validator";
import { Type } from "class-transformer";
import { STATI_ASSEGNAZIONE } from "./assegnazioni.entity";
import { CATEGORIE } from "../corsi/corsi.entity";

export class AddAssegnazioniDTO {
  @IsMongoId()
  @IsNotEmpty({ message: 'CorsoId should not be empty' })
  corsoId: string;

  @IsMongoId()
  @IsNotEmpty({ message: 'DipendenteId should not be empty' })
  dipendenteId: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: 'DataAssegnazione should not be empty' })
  dataAssegnazione: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: 'DataScadenza should not be empty' })
  dataScadenza: Date;

  @IsString()
  @IsNotEmpty({ message: 'Stato should not be empty' })
  @IsIn([...STATI_ASSEGNAZIONE])
  stato: string;
}

export class UpdateAssegnazioniDTO {
  @IsOptional()
  @IsMongoId()
  corsoId?: string;

  @IsOptional()
  @IsMongoId()
  dipendenteId?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dataAssegnazione?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dataScadenza?: Date;

  @IsOptional()
  @IsString()
  @IsIn([...STATI_ASSEGNAZIONE])
  stato?: string;
}

export class QueryListAssegnazioniDTO {
  @IsOptional()
  @IsString()
  @IsIn([...STATI_ASSEGNAZIONE])
  stato?: string;

  @IsOptional()
  @IsString()
  @IsIn([...CATEGORIE], { message: 'Categoria non valida' })
  categoria?: string;

  @IsOptional()
  @IsMongoId()
  corsoId?: string;

  @IsOptional()
  @IsMongoId()
  dipendenteId?: string;
}