
import { IsString, IsArray, IsNotEmpty, IsUrl } from 'class-validator';

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
  imageUrl: string;
}
