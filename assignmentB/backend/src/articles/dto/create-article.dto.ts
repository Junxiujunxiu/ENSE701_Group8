import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsArray()
  @IsNotEmpty()
  authors: string[];

  @IsNotEmpty()
  @IsString()
  journal: string;

  @IsOptional()
  year: number;

  @IsOptional()
  volume: string;

  @IsOptional()
  number: string;

  @IsOptional()
  pages: string;

  @IsOptional()
  doi: string;

  @IsNotEmpty()
  @IsString()
  seMethod: string;

  @IsNotEmpty()
  @IsString()
  claim: string;

  @IsNotEmpty()
  @IsString()
  evidence: string;

  @IsOptional()
  typeOfResearch: string;

  @IsOptional()
  typeOfParticipant: string;
}
