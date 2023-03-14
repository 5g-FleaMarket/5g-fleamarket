import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { LikesEntity } from './likes.entity';
import { OrdersEntity } from './orders.entity';
import { ProductsEntity } from './products.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ default: 0 })
  ban: number;

  // refresh token 저장
  @Column({
    nullable: true,
  })
  @Column({ nullable: true })
  @Exclude()
  currentHashedRefreshToken?: string;
  @OneToMany(() => OrdersEntity, (orders) => orders.buyer)
  orders: OrdersEntity[];

  @OneToMany((type) => ProductsEntity, (products) => products.seller)
  products: ProductsEntity[];
}
