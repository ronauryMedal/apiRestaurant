import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientsModule } from './ingredients/ingredients.module';
import { DishesModule } from './dishes/dishes.module';
import { TablesModule } from './tables/tables.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'db_restaurant',
    autoLoadEntities: true,
    synchronize: true
  }), IngredientsModule, DishesModule, TablesModule, OrdersModule, AuthModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
