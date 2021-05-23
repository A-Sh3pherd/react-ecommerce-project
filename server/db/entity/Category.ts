import {Entity, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, Column, JoinColumn, OneToMany} from "typeorm";
import {Product} from "./Product";

@Entity({name: "categories"})
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @OneToMany(() => Product, product => product.category)
    @JoinColumn()
    product: Product[]

    @CreateDateColumn()
    created_at: Date
}
