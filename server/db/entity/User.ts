import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, JoinColumn} from "typeorm";
import {Cart} from "./Cart";
import {Orders} from "./Orders";

@Entity({name: 'users'})
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fname: string;

    @Column()
    lname: string;

    @Column()
    email: string;

    @Column()
    password: string

    @Column()
    city: string

    @Column()
    street: string

    @Column({
        default: 'customer',
        nullable: true
    })
    role: string

    @OneToMany(() => Cart, cart => cart.id)
    @JoinColumn()
    cart: Cart[]

    @OneToMany(() => Orders, order => order.user)
    @JoinColumn()
    order: Orders[]

    @CreateDateColumn()
    created_at: Date;
}
