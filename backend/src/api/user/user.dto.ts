import { IsIn, IsOptional, IsString } from "class-validator";

export class QueryListUserDTO {
    @IsOptional()
    @IsString()
    @IsIn(['dipendente', 'referente'])
    role?: string;
} 