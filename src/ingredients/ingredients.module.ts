import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { DiscoveryModule } from '@nestjs/core';
import { DishesModule } from 'src/dishes/dishes.module';
import { DishesService } from 'src/dishes/dishes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient])],
  controllers: [IngredientsController],
  providers: [IngredientsService],
  exports: [IngredientsModule, TypeOrmModule],
})
export class IngredientsModule {}
