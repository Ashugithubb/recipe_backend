import { IsEmail, IsEnum, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";
import { Gender } from "../enum/user.enum";


export class CreateUserDto {
    @IsString()
    name: string
    
    @IsEnum(Gender)
    gender: Gender

    @IsEmail()
    email: string

    @IsStrongPassword()
    password: string
}