import { Dish } from "src/dishes/entities/dish.entity";
import { Table } from "src/tables/entities/table.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { State } from "../enums/state.enum";


@Entity({name: 'orders'})
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Table, (table) => table.id,)
    @JoinColumn() 
    table:Table;

    
    @ManyToMany(() => Dish, (dish) => dish.order, { eager: true })
    dishes:Dish[];

    @Column()
    subtotal: number;

    @Column({
        type: 'enum',
        enum: State,
        default: State.in_process
    })
    state: State;

}
