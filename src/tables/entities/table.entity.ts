import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { State } from "../enums/states.enum";
import { Order } from "src/orders/entities/order.entity";

@Entity({ name: 'tables' })
export class Table {

    @PrimaryGeneratedColumn()
    id: number;
   
    @Column()
    description: string;

    @Column()
    capacity: number;

    @Column({
        type: 'enum',
        enum: State,
        default: State.avalable
    })
    state:State;

    @OneToOne(() => Order, (order) => order.table)
    order:Order

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @Column()
    updatedAt: Date;
}
