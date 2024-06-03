import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { State } from '../enums/state.enum';

export class UpdateOrderDto {

    /* @IsOptional()
    @IsNumber()
    table: number; */

    @IsOptional()
    @IsArray()
    dishes:string[]

    /* @IsOptional()
    @IsNumber()
    subtotal: number;
    
    @IsOptional()
    @IsString()
    state: State; */
}
