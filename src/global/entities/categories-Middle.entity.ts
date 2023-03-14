import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductsEntity } from './products.entity';
import { CategoriesLargeEntity } from './categories-Large.entity';
import { CategoriesEntity } from './categories.entity';

@Entity({ name: 'categoriesMiddle' })
export class CategoriesMiddleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => CategoriesLargeEntity, (large) => large.middle)
  large: CategoriesLargeEntity;
  @Column()
  largeId: number;

  @OneToMany((type) => CategoriesEntity, (detail) => detail.middle)
  detail: CategoriesEntity[];
}
