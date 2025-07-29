import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { ILike, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { In } from 'typeorm';
@Injectable()
export class RecipeService {
  constructor(@InjectRepository(Recipe) private readonly recipeRepo: Repository<Recipe>,
    private readonly userService: UserService) { }


  async searchRecipeByTitle(page: number, limit: number, title: string) {
    const skip = (page - 1) * limit;
    return await this.recipeRepo.find({
      where: { title: ILike(`%${title}%`) },
      take: limit,
      skip
    })
  }


  async createRecipe(createRecipeDto: CreateRecipeDto, userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new ForbiddenException("need to log in to add recipe");
    const newRecipe = this.recipeRepo.create({
      ...createRecipeDto,
      user
    })
    return await this.recipeRepo.save(newRecipe);
  }



  async getAllRecipes(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return await this.recipeRepo.find(
      {
        take: limit,
        skip
      }
    );
  }

  async addFavourite(recipeId: number, userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new ForbiddenException("You are not Logged In");

    if (!user.favorites) user.favorites = [];

    user.favorites.push(recipeId);

    await this.userService.update(userId, user);

    return { msg: "Added to Favourite" };
  }



async getAllUserFavorite(userId: number) {
  const user = await this.userService.findOne(userId);
  const favoriteIds = user?.favorites;

  if (!favoriteIds || favoriteIds.length === 0) {
    return [];
  }

  const favoriteRestaurants = await this.recipeRepo.find({
    where: { id: In(favoriteIds) },
  });

  return favoriteRestaurants;
}



  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
