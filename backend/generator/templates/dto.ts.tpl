import { IsString, IsOptional, IsNotEmpty } from "class-validator";

export class Add{{Name}}DTO {
  @IsString()
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;
}

export class Update{{Name}}DTO {
  @IsOptional()
  @IsString()
  name?: string;
}