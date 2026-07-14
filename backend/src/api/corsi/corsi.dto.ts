import { IsString, IsOptional, IsNotEmpty, IsNumber, Min, IsBoolean } from "class-validator";
import { Type } from "class-transformer";

export class AddCorsiDTO {
  @IsString()
  @IsNotEmpty()
  titolo: string;

  @IsString()
  @IsNotEmpty()
  descrizione: string;

  @IsString()
  @IsNotEmpty()
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
  categoria?: string;

  @IsOptional()
  @IsString()
  attivo?: string;
}