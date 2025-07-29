import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "../enum/user.enum";
import { Recipe } from "src/recipe/entities/recipe.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column({ select: false })
    password: string

    @Column({
        type: 'enum',
        enum: Gender,
        default: Gender.MALE,
    })
    gender: Gender

    @Column('simple-array',{nullable:true})
    favorites: number[]

    @OneToMany(()=>Recipe,(r)=>r.user)
    recipes:Recipe[]

}
