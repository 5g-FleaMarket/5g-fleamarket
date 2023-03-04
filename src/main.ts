import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './global/util/swagger/swagger-mainpage';
import * as cookieParser from 'cookie-parser';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 커스텀 로거 활성화시 주석 해제
    // logger: WinstonModule.createLogger({
    //   transports: [
    //     new winston.transports.Console({
    //       level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
    //       format: winston.format.combine(
    //         winston.format.timestamp(),
    //         nestWinstonModuleUtilities.format.nestLike('5gnunFleaMarket', {
    //           prettyPrint: true,
    //         }),
    //       ),
    //     }),
    //   ],
    // }),
  });
  setupSwagger(app);
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
  });
  await app.listen(3000);
}
void bootstrap();
