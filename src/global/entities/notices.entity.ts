import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AdminsEntity } from './admins.entity';
import { UserEntity } from './users.entity';

@Entity({ name: 'notices' })
export class NoticesEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @ManyToOne((type) => AdminsEntity)
  adminId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  createdAt: string;

  @Column()
  deletedAt: string;
}
