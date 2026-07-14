import { IsString, IsOptional, IsNotEmpty, IsMongoId, IsDate } from "class-validator";

export class AddAssegnazioniDTO {
  @IsMongoId()
  @IsNotEmpty()
  corsoId: string;

  @IsMongoId()
  @IsNotEmpty()
  dipendenteId: string;

  @IsDate()
  @IsNotEmpty()
  dataAssegnazione: Date;

  @IsDate()
  @IsNotEmpty()
  dataScadenza: Date;

  @IsString()
  @IsNotEmpty()
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
  @IsDate()
  dataAssegnazione?: Date;

  @IsOptional()
  @IsDate()
  dataScadenza?: Date;

  @IsOptional()
  @IsString()
  stato?: string;

}