import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { In } from 'typeorm';
import { RecipeCategory, RecipeDifficulty } from './enum/recepie.enum';
import { GetRecipesQueryDto } from './dto/query.dto';
@Injectable()
export class RecipeService {
  constructor(@InjectRepository(Recipe) private readonly recipeRepo: Repository<Recipe>,
    private readonly userService: UserService) { }

  async createRecipe(createRecipeDto: CreateRecipeDto, userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new ForbiddenException("need to log in to add recipe");
    const newRecipe = this.recipeRepo.create({
      ...createRecipeDto,
      user
    })
    return await this.recipeRepo.save(newRecipe);
  }

  async findOne(id: number) {
    return await this.recipeRepo.findOneBy({ id });
  }



  async getFilteredRecipes(query: GetRecipesQueryDto) {
    const { page = 1, limit = 10, title, difficultyLevel, category } = query;

    const where: FindOptionsWhere<Recipe> = {};

    if (title) {
      where.title = ILike(`%${title}%`);
    }

    if (difficultyLevel) {
      where.difficultyLevel = difficultyLevel;
    }

    if (category) {
      where.category = category;
    }
    const [recepie, total] = await this.recipeRepo.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      recepie,
      total,
      page,
      limit,
    };
  }

}





  // async searchRecipeByTitle(page: number, limit: number, title: string) {
  //   const skip = (page - 1) * limit;
  //   return await this.recipeRepo.find({
  //     where: { title: ILike(`%${title}%`) },
  //     take: limit,
  //     skip
  //   })
  // }




  // async getAllRecipes(page: number, limit: number) {
  //   const skip = (page - 1) * limit;
  //   return await this.recipeRepo.find(
  //     {
  //       take: limit,
  //       skip,
  //       select: ['id', 'title', 'ingredients', 'steps',]
  //     }
  //   );
  // }




  // async filterBasedOnType(
  //   difficultyLevel?: RecipeDifficulty,
  //   category?: RecipeCategory
  // ) {
  //   const where: FindOptionsWhere<Recipe> = {};
  //   if (difficultyLevel) {
  //     where.difficultyLevel = difficultyLevel;
  //   }
  //   if (category) {
  //     where.category = category;
  //   }

  //   return this.recipeRepo.find({ where });
  // }






