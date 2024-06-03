import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredientDto } from './create-ingredient.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateIngredientDto{

    @IsOptional()
    @IsString()
    name: string

}
