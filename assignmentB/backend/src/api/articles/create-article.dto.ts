import { IsString, IsArray, IsNumber } from 'class-validator';

//DTO is in application layer, often in controllers and servoce, to validate and transfer data between different parts of the application
//when you receive a request to create a new article, you use this DTO to validate that the incoming data has the correct structure and types 
export class CreateArticleDto {
  @IsString()
  readonly title: string;

  @IsArray()
  readonly authors: string[];

  @IsString()
  readonly source: string;

  @IsNumber()
  readonly pubyear: number;

  @IsString()
  readonly doi: string;

  @IsString()
  readonly claim: string;

  @IsString()
  readonly evidence: string;
}
