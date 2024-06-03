import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from './entities/dish.entity';
import { Repository } from 'typeorm';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { Console, error } from 'console';

@Injectable()
export class DishesService {

  constructor(
    @InjectRepository(Dish) private dishRepository: Repository<Dish>,
    @InjectRepository(Ingredient) private ingredientRepository: Repository<Ingredient>
  ) {}
  async create(createDishDto: CreateDishDto) {

   try {
    const {ingredients,...dish}=createDishDto;
   const newdesh= this.dishRepository.create({

      ...dish,
      ingredients: []= ingredients.map(ingredient => this.ingredientRepository.create({
        ...ingredient
      }))

   })
  /*  console.log(existingrdients); */
   await this.dishRepository.save(newdesh);
   return newdesh;

   } catch (error) {
    throw new BadRequestException('plato no creado');
   }
  }

  async findAll() {
    return await this.dishRepository.find({relations: ['ingredients']});
  }

  async findOne(id: number) {
    return await this.dishRepository.findOneBy({id: id});
  }

  async update(id: number, updateDishDto: UpdateDishDto) {
    try {

      const {name,price,dish_people,ingredients: ingredients,category}=updateDishDto;

      const dish = await this.dishRepository.createQueryBuilder('dish')
      .leftJoinAndSelect('dish.ingredients', 'ingredient')
      .where('dish.id = :id', { id })
      .getOne();

     
      if (!dish) {
        throw error;
      }

      dish.name = name;
      dish.price = price;
      dish.dish_people = dish_people;
      dish.category = category;


      const existingrdientsname = dish.ingredients.map(ingredient => ingredient.name);
      const newINgredient = ingredients.map(ingredient => ingredient.name);

      const newIngredients = newINgredient.filter(ingredient => !existingrdientsname.includes(ingredient));
      const deletedIngredients = existingrdientsname.filter(ingredient => !newINgredient.includes(ingredient));
      const updatedIngredients = ingredients.filter(ingredient => newINgredient.includes(ingredient.name));
      const updatedIngredientsNames = updatedIngredients.map(ingredient => ingredient.name);
      dish.ingredients = newINgredient.map(ingredient => {

        if (newIngredients.includes(ingredient)) {
          return this.ingredientRepository.create({
            name: ingredient
          });
        } else if (deletedIngredients.includes(ingredient)) {
          return this.ingredientRepository.create({
            name: ingredient
          });
        } else if (updatedIngredientsNames.includes(ingredient)) {
          return this.ingredientRepository.create({
            name: ingredient
          });
        }
      });
     return await this.dishRepository.save(dish);
    } catch (error) {
      throw new BadRequestException('plato no encontrado para actualizar');
    }

    return `This action updates a #${id} dish`;
  }

  async remove(id: number) {

    try {
      const dish = await this.dishRepository.createQueryBuilder('dish')
    .leftJoinAndSelect('dish.ingredients', 'ingredient')
    .where('dish.id = :id', { id })
    .getOne()
    console.log(dish)
    if (!dish) {
      throw error;
    }
    await this.dishRepository.remove(dish);
  } catch (error) {
    
    console.log(error)
    throw new BadRequestException('plato no encontrado para borrar');
    }

    return "deleted dish successfully"; 
  }
}
