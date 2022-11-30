import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LoginModule } from './login/login.module'
import { SpiderModule } from './spider/spider.module'

@Module({
  imports: [LoginModule, SpiderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
