import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { UserModule } from 'src/user/user.module';
import { RecipeModule } from 'src/recipe/recipe.module';

@Module({
  imports:[TypeOrmModule.forFeature([Favorite]),UserModule,RecipeModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
