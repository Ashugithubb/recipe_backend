import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, Res } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth';
import { RecipeCategory, RecipeDifficulty } from './enum/recepie.enum';
import { GetRecipesQueryDto } from './dto/query.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) { }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createRecipeDto: CreateRecipeDto, @Req() req) {
    const userId = req.user.id
    return this.recipeService.createRecipe(createRecipeDto, userId);
  }

  @Get('all')
  async getFilteredRecipes(@Query() query: GetRecipesQueryDto) {
    return this.recipeService.getFilteredRecipes(query);
  }


  // @Get('all')
  // findAll(@Query('page') page: number = 1,
  //   @Query('limit') limit: number = 5,
  // ) {
  //   return this.recipeService.getAllRecipes(+page, +limit);
  // }

  // @Get('search')
  // getRecipe(
  //   @Query('page') page: number = 1,
  //   @Query('limit') limit: number = 10,
  //   @Query('title') title: string
  // ) {
  //   return this.recipeService.searchRecipeByTitle(page, limit, title);
  // }

  // @Get('filter')
  // filterBasedOneType(
  //   @Query('difficultyLevel') difficultyLevel?: RecipeDifficulty,
  //   @Query('category') category?: RecipeCategory
  // ) {
  //   return this.recipeService.filterBasedOnType(difficultyLevel, category);
  // }




}
