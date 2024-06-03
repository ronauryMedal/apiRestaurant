import { Module } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './entities/dish.entity';
import { IngredientsModule } from 'src/ingredients/ingredients.module';
import { IngredientsService } from 'src/ingredients/ingredients.service';


@Module({
  imports: [TypeOrmModule.forFeature([Dish]),IngredientsModule],
  controllers: [DishesController],
  providers: [DishesService],
  exports: [DishesService, TypeOrmModule],
})
export class DishesModule {}
