import { IsEmail, IsNotEmpty, MinLength, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsIn(['seller', 'buyer'])
  role: string;
}
