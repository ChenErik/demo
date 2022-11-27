import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'

export class CreateLoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 10, {
    message: 'Max Length is 10',
  })
  name: string

  @IsNumber()
  age: number
}
