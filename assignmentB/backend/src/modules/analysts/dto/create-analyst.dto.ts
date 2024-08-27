import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateAnalystDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  expertiseArea?: string;
}
