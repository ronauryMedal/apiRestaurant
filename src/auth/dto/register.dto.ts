import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class RegisterDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    username: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string





}
