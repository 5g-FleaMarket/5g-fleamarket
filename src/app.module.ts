import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from './config/orm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: OrmConfig,
      inject: [ConfigService],
    }),
  ],

  controllers: [AppController, UserController, AuthController],
  providers: [AppService],
})
export class AppModule {}
