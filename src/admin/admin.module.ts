import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminsEntity } from '../global/entities/admins.entity';
import { CategoriesEntity } from '../global/entities/categories.entity';
import { NoticesEntity } from '../global/entities/notices.entity';
import { ProductsEntity } from '../global/entities/products.entity';
import { UserEntity } from "../global/entities/users.entity";
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProductsEntity, CategoriesEntity, AdminsEntity, NoticesEntity])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
