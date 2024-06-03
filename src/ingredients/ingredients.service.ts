import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { error } from 'console';

@Injectable()
export class IngredientsService {

  constructor(
    @InjectRepository(Ingredient) private ingredientsRepository: Repository<Ingredient>, 
  ) {}
  async create(createIngredientDto: CreateIngredientDto) {

   try {

    var ingredient = await this.ingredientsRepository.create(createIngredientDto);
    await this.ingredientsRepository.save(ingredient);
    
   } catch (error) {
    
   }

    return ingredient;
  }

   async findAll() {

    try {
     var ingredients = await this.ingredientsRepository.find({relations:['dishes']});
    } catch (error) {
      
    }

    return ingredients;
  }

 async findOne(id: number) {
  try {
    var ingredient = await this.ingredientsRepository.findOneBy({id: id});
    console.log(ingredient);
    if (!ingredient) {
      throw error;
    }
  } catch (error) {
    throw new BadRequestException('Ingrediente no encontrado');
  }
    return ingredient;
  }

 async update(id: number, updateIngredientDto: UpdateIngredientDto) {

  try {
    var ingredient = await this.ingredientsRepository.findOneBy({id: id});
    if (!ingredient) {
      throw error;
    }
   
    await this.ingredientsRepository.update(id, {
       ...updateIngredientDto,
       updatedAt: new Date()
      } );
  } catch (error) {
    throw new BadRequestException('Ingrediente no encontrado para actualizar');
  }
    return "ingrediente actualizado";
  }

  remove(id: number) {
    return `This action removes a #${id} ingredient`;
  }
}
