import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    ManyToOne,
    OneToOne,
    JoinColumn, OneToMany, ManyToMany
} from "typeorm";
import {User} from "./User";
import {Orders} from "./Orders";
import {Cart_product} from "./Cart_product";

@Entity({name: "carts"})
export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 'in-progress'})
    status: string

    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    user: User[] // user_id

    @OneToOne(() => Orders)
    @JoinColumn()
    order: Orders

    @OneToMany(() => Cart_product, cart_products => cart_products.cart)
    cartProducts: Cart_product[]

    @CreateDateColumn()
    created_at: Date



}
