import { Ingredient } from "src/ingredients/entities/ingredient.entity"
import { Category } from "../enums/category.enum"
import { IsArray, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"

export class CreateDishDto {


@IsNotEmpty()
@IsString()
@MinLength(5)
name: string

@IsNotEmpty()
@IsNumber()
price: number

@IsNotEmpty()
@IsNumber()
dish_people: number

@IsArray()
ingredients: Ingredient[]

@IsString()
@MinLength(5)
@IsNotEmpty()
category: Category

}
