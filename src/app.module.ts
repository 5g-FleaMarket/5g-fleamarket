import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from './config/orm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from './user/user.service';
// import { SmsService } from './sms/sms.service';
// import { SmsModule } from './sms/sms.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './global/entities/users.entity';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { OrdersModule } from './orders/orders.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckController } from 'src/helath-check/health-check.controller';
import { HttpModule } from '@nestjs/axios';
import { LoggingModule } from './global/util/logger/logger.module';
import { JwtGoogleStrategy } from './auth/strategy/jwt-google.strategy';
import { AuthController } from './auth/auth.controller';
import { SocialModule } from './social/social.module';
import { validationSchema } from './config/validationSchema';
import { EmailController } from './email/email.controller';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminLoginController } from './views/admin/admin-login.controller';
import { ProductsModule } from './products/products.module';
import { ProductsEntity } from './global/entities/products.entity';
import { CategoriesEntity } from './global/entities/categories.entity';
import { ProductImagesEntity } from './global/entities/productimages.entity';
import { CategoriesLargeEntity } from './global/entities/categories-Large.entity';
import { CategoriesMiddleEntity } from './global/entities/categories-Middle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoriesEntity,
      UserEntity,
      ProductsEntity,
      ProductImagesEntity,
      CategoriesLargeEntity,
      CategoriesMiddleEntity,
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    UserModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      useClass: OrmConfig,
      inject: [ConfigService],
    }),
    // SmsModule,
    AdminModule,
    OrdersModule,
    LoggingModule,
    TerminusModule,
    SocialModule,
    EmailModule,
    AdminAuthModule,
    ProductsModule,
  ],
  controllers: [
    AppController,
    HealthCheckController,
    AuthController,
    EmailController,
    AdminLoginController,
  ],

  providers: [
    AppService,
    // SmsService,
    AuthService,
    UserService,
    JwtService,
    EmailService,
    HttpModule,
    JwtGoogleStrategy,
    HealthCheckController,
    // ProductsService,
    // { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
