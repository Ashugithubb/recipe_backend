import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, Res } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) { }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createRecipeDto: CreateRecipeDto, @Req() req) {
    const userId = req.user.id
    return this.recipeService.createRecipe(createRecipeDto, userId);
  }

  @Get('search')
  getRecipes(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('title') title: string
  ) {
    return this.recipeService.searchRecipeByTitle(page, limit, title);
  }


  // @Get('all')
  // findAll(@Query('page') page: number = 1,
  //   @Query('limit') limit: number = 5,
  //   @Query('title') title: string) {
  //   return this.recipeService.getAllRecipes(page, limit);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('favourite/:recipeId')
  // addFavourite(@Param('recipeId') recipeId: string, @Req() req) {
  //   const userId = req.user.id
  //   return this.recipeService.addFavourite(+recipeId, userId);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getAllUserFavorite(@Req() req) {
    const userId = req.userId;
    return this.recipeService.getAllUserFavorite(+userId)
  }



  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.recipeService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  }
}
