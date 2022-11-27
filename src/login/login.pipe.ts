import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const DTO = plainToInstance(metadata.metatype, value)
    await validate(DTO)
    return { value }
  }
}
