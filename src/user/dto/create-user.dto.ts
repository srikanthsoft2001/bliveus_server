import { IsString, IsEmail, IsArray, IsEnum } from 'class-validator';
import { Role } from './roles.enum';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
 
  @IsString()
  phoneNumber?: string;

  @IsString()
  address?: string;

  @IsArray()
  @IsEnum(Role, { each: true })
  roles?: Role[];
}
