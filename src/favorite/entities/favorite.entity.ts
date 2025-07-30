import { Recipe } from "src/recipe/entities/recipe.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('favorites')
export class Favorite {
@PrimaryGeneratedColumn()
id:number

@ManyToOne(()=>Recipe)
recipe:Recipe

@ManyToOne(()=>User,(u)=>u.favorite)
user:User

}
