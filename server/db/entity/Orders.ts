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

    @Column()
    order_at: Date

    @Column()
    card_details: number

    @ManyToOne(type => User, user => user.id)
    @JoinColumn()
    user: User

    @OneToOne(type => Cart)
    @JoinColumn()
    cart: Cart

    @CreateDateColumn()
    created_at: Date
}
