import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './global/common/decorator/skip-auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @Render('login.ejs')
  async view() {
    return { name: 'peter', age: 28, job: 'software engineer' };
  }
  @Public()
  @Get('view/signup')
  @Render('signup.ejs')
  async viewSignup() {}
  @Get('orders/index')
  @Render('order-layout.ejs')
  async index() {}

  @Get('test')
  @Render('index.ejs')
  async test() {}

  @Get('mypage')
  @Render('mypage.ejs')
  async mypage() {}
}
