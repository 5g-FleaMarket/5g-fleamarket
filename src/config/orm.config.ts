import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { AdminsEntity } from '../global/entities/admins.entity';
import { CategoriesEntity } from '../global/entities/categories.entity';
import { LikesEntity } from '../global/entities/likes.entity';
import { NoticesEntity } from '../global/entities/notices.entity';
import { OrdersEntity } from '../global/entities/orders.entity';
import { ProductsEntity } from '../global/entities/products.entity';
import { ProductImagesEntity } from '../global/entities/productimages.entity';
import { UserEntity } from '../global/entities/users.entity';
import { CategoriesLargeEntity } from 'src/global/entities/categories-Large.entity';
import { CategoriesMiddleEntity } from 'src/global/entities/categories-Middle.entity';

@Injectable()
export class OrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    // console.log(this.configService.get('TEST'));
    console.log(__dirname);
    return {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      //entities: [__dirname + '/../**/*.entity.*'],
      synchronize: this.configService.get<boolean>('DATABASE_SYNCHRONIZE'), // 연결될때 데이터베이스 초기화됨
      entities: [
        //TODO: 이후 코드 리팩토링시 entities를 모아서 관리할 수 있도록 수정해야함
        AdminsEntity,
        CategoriesEntity,
        LikesEntity,
        NoticesEntity,
        OrdersEntity,
        ProductsEntity,
        ProductImagesEntity,
        UserEntity,
        CategoriesLargeEntity,
        CategoriesMiddleEntity,
      ],
      migrations: [__dirname + '/../**/migrations/*.js'],
      migrationsTableName: 'migrations',
      logging: true,
    };
  }
}
