import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    ManyToOne,
    OneToOne,
    OneToMany, JoinColumn, ManyToMany
} from "typeorm";
import {Cart} from "./Cart";
import {Product} from "./Product";

@Entity()
export class Cart_product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number

    @Column()
    total_price: number

    @ManyToOne(() => Cart)
    @JoinColumn()
    cart: Cart

    @ManyToOne(() => Product, {eager: true})
    @JoinColumn()
    product: Product

    @CreateDateColumn()
    created_at: Date
}
