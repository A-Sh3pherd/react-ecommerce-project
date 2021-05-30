import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    ManyToOne,
    OneToOne,
    Column, JoinColumn
} from "typeorm";
import {User} from "./User";
import {Cart} from "./Cart";

@Entity()
export class Orders extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    total_price: number

    @Column()
    city: string

    @Column()
    street: string

    @Column()
    delivery_date: Date

    @Column({})
    credit_card: string

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn()
    user: User

    @OneToOne(() => Cart)
    @JoinColumn()
    cart: Cart

    @CreateDateColumn()
    created_at: Date
}
