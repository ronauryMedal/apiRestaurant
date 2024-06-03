import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTableDto {

    @IsString()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    capacity: number;
   
}
