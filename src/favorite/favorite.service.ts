import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { RecipeService } from 'src/recipe/recipe.service';

@Injectable()
export class FavoriteService {
  constructor(@InjectRepository(Favorite) private readonly favRepo: Repository<Favorite>,
    private readonly userService: UserService,
    private readonly recipeService: RecipeService) { }

  async addFavourite(recipeId: number, userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new ForbiddenException("You are not Logged In");

    const recipe = await this.recipeService.findOne(recipeId);
    if (!recipe) throw new NotFoundException("recipe not found");

    const existing = await this.favRepo.findOne({
      where: {
        user: { id: userId },
        recipe: { id: recipeId }
      }
    });
    if (existing) throw new ConflictException("Recipe already in favorite list");

    const newFav = this.favRepo.create({
      user,
      recipe
    })
    await this.favRepo.save(newFav);
    return { msg: "Added to Favourite" };
  }

  async getAllUserFavorite(userId: number) {
    return await this.favRepo.find({
      where: { user: { id: userId } },
      relations: ['recipe'],
    });
  }
  async remove(id: number) {
    console.log("id",id);
    return await this.favRepo.delete(id);
  }

// // Service
// async deleteByRecipeId(recipeId: string) {
//   return await this.favoriteRepository.delete({
//     recipe: { id: +recipeId },
//   });
// }


  create(createFavoriteDto: CreateFavoriteDto) {
    return 'This action adds a new favorite';
  }

  findAll() {
    return `This action returns all favorite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

}
