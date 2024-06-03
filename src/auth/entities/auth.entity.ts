import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enums/roles.enum";

@Entity("users")
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column( {unique: true, nullable: false} )
    email: string

    @Column()
    password: string;
    
    @Column({type: "enum", enum: Role, default: [Role.WAITER]})
    role: Role[];
    
    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createAt: Date;
}
