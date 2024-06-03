import { IsNotEmpty, IsString, MinLength, minLength } from "class-validator";

export class CreateIngredientDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    name: string;
}
