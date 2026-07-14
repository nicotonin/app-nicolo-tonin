import { IsString, IsOptional, IsMongoId, IsIn, Matches } from "class-validator";
import { CATEGORIE } from "../corsi/corsi.entity";

export class QueryRiepilogoDTO {
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}$/, { message: 'Formato mese non valido (usa YYYY-MM)' })
  mese?: string;

  @IsOptional()
  @IsString()
  @IsIn([...CATEGORIE], { message: 'Categoria non valida' })
  categoria?: string;

  @IsOptional()
  @IsMongoId()
  dipendenteId?: string;
}