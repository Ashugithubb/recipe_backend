import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}


 @UseGuards(JwtAuthGuard)
  @Post(':recipeId')
  addFavourite(@Param('recipeId') recipeId: string, @Req() req) {
    const userId = req.user.id
    return this.favoriteService.addFavourite(+recipeId, +userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  getAllUserFavorite(@Req() req) {
    const userId = req.user.id;
    return this.favoriteService.getAllUserFavorite(+userId);
  }
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.favoriteService.remove(+id);
  }






  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoriteService.create(createFavoriteDto);
  }

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavoriteDto: UpdateFavoriteDto) {
    return this.favoriteService.update(+id, updateFavoriteDto);
  }
}
