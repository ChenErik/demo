import { Controller, Get } from '@nestjs/common'

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { AppService } from './app.service'

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getChen()
  }
}
