import { Dish } from "src/dishes/entities/dish.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ingredient {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

   @ManyToMany(() => Dish, (dish) => dish.ingredients)
   dishes: Dish[]

    @Column({
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column()
    updatedAt: Date;

}
