import { IsIn, IsString } from "class-validator";

export class QueryListUserDTO {
    @IsString()
    @IsIn(['dipendente', 'referente'])
    role: string;
} 