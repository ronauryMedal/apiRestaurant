
import { IsString, IsNumber, IsOptional, } from 'class-validator';
import { State } from '../enums/states.enum';
import { IsNull } from 'typeorm';

export class UpdateTableDto{

    @IsOptional()
    @IsString()
    description: string;
    @IsOptional()
    @IsNumber()
    capacity: number;
    @IsOptional()
    @IsString()
    state: State


}
