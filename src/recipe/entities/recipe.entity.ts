import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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


    @Column()
    imageUrl: string

    @ManyToOne(() => User, (u) => u.recipes)
    user: User
}
