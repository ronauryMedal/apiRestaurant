import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Dish } from 'src/dishes/entities/dish.entity';
import { Table } from 'src/tables/entities/table.entity';
import { clearScreenDown } from 'readline';

@Injectable()
export class OrdersService {


  constructor (

    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Table) private tableRepository: Repository<Table>,
    @InjectRepository(Dish) private dishRepository: Repository<Dish>,
    @InjectEntityManager() private manager: EntityManager

  ) {}
 async create(createOrderDto: CreateOrderDto) {

  const {table,dishes,subtotal,state}=createOrderDto

 /* const {dishes}=createOrderDto */

  const tabledb = await this.tableRepository.findOneBy({id:table})
     
  if (!tabledb) {
    return new BadRequestException("la mesa selecionada no existe")
  }

  /* console.log(dishes)
  const dishesdbha  =  dishes.map(( dish) => this.dishRepository.findOneBy({name:dish})) */

  var dishesdb:Dish[]=[];

  for await (const dish of dishes) {
    dishesdb.push(await this.dishRepository.findOneBy({name:dish}))
  }
  /* console.log(dishesdb) */
  const  cal_preice = (dishes:Dish[])=>{return dishes.map(dish => dish.price).reduce((acc,curr)=>acc + curr,0) }

   const neworder = this.orderRepository.create({
     dishes:dishesdb,
     table:tabledb,
     subtotal:cal_preice(dishesdb),
    })

    console.log(neworder)
    /* return neworder */
    return this.orderRepository.save(neworder);
 }

 async findAll() {

  try {
    var orders = await this.orderRepository.find();
    console.log(orders);
    
  } catch (error) {
    
    throw new NotFoundException( error.message)
  }
    return orders;
  }

async  findOne(id: number) {


   try {
    var order = await this.orderRepository.findOneBy({id: id});
    if (!order) {
      throw new NotFoundException( "orden no encontrada") ;
    }
  } catch (error) {
    
    throw new  BadRequestException( error.message) ;
   }



    return order;
  }

 async update(id: number, updateOrderDto: UpdateOrderDto) {


  try {
    const {dishes}=updateOrderDto
    var order =await this.orderRepository.createQueryBuilder('order')
    .innerJoinAndSelect('order.dishes', 'dish')
    .where('order.id = :id', { id })
    .getOne()
    if (!order) {
      throw new NotFoundException( "orden no encontrada") ;
    }

    if (dishes) {
      var dishesdb:Dish[]=[];
      for await (const dish of dishes) {
        dishesdb.push(await this.dishRepository.findOneBy({name:dish}))
      }
      order.dishes = dishesdb
      order.subtotal = (dishesdb.map(dish => dish.price).reduce((acc,curr)=>acc + curr,0))
    }

    

    this.orderRepository.save(order)
   


  } catch (error) {
    
  }
    return order;
  }

 async remove(id: number) {

  try {
    
    const order = await this.orderRepository.findOne({where: {id: id}, relations: ['dishes']});

    if (!order) {
      throw new NotFoundException( "orden no encontrada") ;
    }
    await this.manager.createQueryBuilder()
    .relation(Order, "dishes")
    .of(order)
    .remove(order.dishes.map(dish => dish.id));

    await this.orderRepository.remove(order);
  } catch (error) {
    throw new  BadRequestException( error.message) ;
  }
    return "deleted order successfully";
  }
}
