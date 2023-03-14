import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoriesMiddleEntity } from './categories-Middle.entity';

@Entity({ name: 'categorieshigh' })
export class CategoriesLargeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => CategoriesMiddleEntity, (middle) => middle.large)
  middle: CategoriesMiddleEntity[];
}
