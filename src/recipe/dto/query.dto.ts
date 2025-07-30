import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { RecipeCategory, RecipeDifficulty } from '../enum/recepie.enum';


export class GetRecipesQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(RecipeDifficulty)
  difficultyLevel?: RecipeDifficulty;

  @IsOptional()
  @IsEnum(RecipeCategory)
  category?: RecipeCategory;
}
