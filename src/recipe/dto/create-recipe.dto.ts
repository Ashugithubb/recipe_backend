
import { IsString, IsArray, IsNotEmpty, IsUrl, IS_BOOLEAN_STRING, IsOptional } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsString({ each: true })
  ingredients: string[];

  @IsArray()
  @IsString({ each: true })
  steps: string[];

  @IsString()
  @IsUrl()
  @IsOptional()
  imageUrl: string;
}
