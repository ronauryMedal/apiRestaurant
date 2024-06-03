import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../enums/category.enum";
import { Ingredient } from "src/ingredients/entities/ingredient.entity";
import { Order } from "src/orders/entities/order.entity";

@Entity()
export class Dish {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;


    @Column()
    dish_people: number;

    @ManyToMany(() => Ingredient, (ingredient) => ingredient.dishes,{
        cascade: true
    })
    @JoinTable()
    ingredients: Ingredient[];

    @ManyToMany(()=>Order,(order)=>order.dishes,{
        cascade: true
    })
    @JoinTable()
    order:Order[]

    @Column({
        type: 'enum',
        enum: Category
    })
    category: Category;

    @Column({
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
