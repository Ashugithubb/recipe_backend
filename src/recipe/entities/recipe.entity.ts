import { Favorite } from "src/favorite/entities/favorite.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RecipeCategory, RecipeDifficulty } from "../enum/recepie.enum";

@Entity('recipes')
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ type: 'jsonb', default: [] })
    ingredients: string[];

    @Column({ type: 'jsonb', default: [] })
    steps: string[];


    @Column({nullable:true})
    imageUrl: string

    @Column({type:"enum",enum:RecipeDifficulty,default:RecipeDifficulty.Easy})
    difficultyLevel:RecipeDifficulty

    @Column({type:"enum",enum:RecipeCategory,default:RecipeCategory.Dinner})
    category:RecipeCategory

    @ManyToOne(() => User, (u) => u.recipes)
    user: User

    @OneToMany(()=>Favorite,(f)=>f.recipe)
    favorite:Favorite[]
}
