import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, JoinColumn} from "typeorm";
import {Cart} from "./Cart";
import {Orders} from "./Orders";

@Entity({name: 'users'})
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    fname: string;

    @Column({
        nullable: false
    })
    lname: string;

    @Column({
        nullable: false
    })
    email: string;

    @Column({
        nullable: false
    })
    password: string

    @Column({
        nullable: false
    })
    city: string

    @Column({
        nullable: false
    })
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
    orders: Orders[]

    @CreateDateColumn()
    created_at: Date;
}
