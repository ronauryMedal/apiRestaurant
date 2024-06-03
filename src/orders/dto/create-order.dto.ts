import { IsNumber, IsString, IsOptional, IsArray } from "class-validator";
import { State } from "../enums/state.enum";
import { Dish } from "src/dishes/entities/dish.entity";

export class CreateOrderDto {
    @IsOptional()
    @IsNumber()
    table: number;

    @IsOptional()
    @IsArray()
    dishes:string[]

    @IsOptional()
    @IsNumber()
    subtotal: number;
    
    @IsOptional()
    @IsString()
    state: State;

}
