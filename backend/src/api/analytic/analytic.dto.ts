import { IsString, IsOptional, IsNotEmpty } from "class-validator";

export class AddAnalyticDTO {
  @IsString()
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;
}

export class UpdateAnalyticDTO {
  @IsOptional()
  @IsString()
  name?: string;
}