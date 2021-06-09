import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToOne
} from "typeorm";

import { Cart_product } from "./Cart_product";
import { Category } from "./Category";

@Entity({ name: "products" })
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    price: number

    @Column()
    image_url: string

    @OneToOne(() => Cart_product)
    cart_product: Cart_product

    @ManyToOne(() => Category, category => category.name)
    @JoinColumn()
    category: Category

    @CreateDateColumn()
    created_at: Date
}
