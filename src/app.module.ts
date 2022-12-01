import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LoginModule } from './login/login.module'
import { SpiderModule } from './spider/spider.module'
import { GuardModule } from './guard/guard.module';

@Module({
  imports: [LoginModule, SpiderModule, GuardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
