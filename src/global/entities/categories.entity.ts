import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoriesMiddleEntity } from './categories-Middle.entity';
import { ProductsEntity } from './products.entity';

@Entity({ name: 'categories' })
export class CategoriesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt?: Date;

  @OneToMany((type) => ProductsEntity, (products) => products.category)
  products: ProductsEntity[];

  @ManyToOne((type) => CategoriesMiddleEntity, (middle) => middle.detail)
  middle: CategoriesMiddleEntity;
  @Column()
  middleId: number;
}
