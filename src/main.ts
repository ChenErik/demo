import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpFilter } from './common/filter'
import { Response } from './common/response'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new Response()) // 全局响应拦截器
  app.useGlobalFilters(new HttpFilter()) // 全局异常拦截器
  app.useGlobalPipes(new ValidationPipe())
  // app.useGlobalGuards(new RoleGuard())
  await app.listen(3000)
}
bootstrap()
