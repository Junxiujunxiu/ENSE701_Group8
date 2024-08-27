import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateModeratorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  role?: string;
}
