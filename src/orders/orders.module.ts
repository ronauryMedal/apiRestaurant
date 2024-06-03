import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DiscoveryModule } from '@nestjs/core';
import { DishesService } from 'src/dishes/dishes.service';
import { TablesService } from 'src/tables/tables.service';
import { DishesModule } from 'src/dishes/dishes.module';
import { TablesModule } from 'src/tables/tables.module';
import { IngredientsService } from 'src/ingredients/ingredients.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order]),TablesModule,DishesModule],
  controllers: [OrdersController],
  providers: [OrdersService,],
})
export class OrdersModule {}
