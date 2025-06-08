// import { IsString, IsStrongPassword, IsEmail, IsOptional, IsIn } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

// export class CreateUserDto {
//   // @IsString()
//   // firstName: string;

//   // @IsString()
//   // lastName: string;

//   @IsEmail()
//   email: string;

//   @IsStrongPassword()
//   password: string;

//   // @IsOptional()
//   // @IsString()
//   // phoneNumber?: string;

//   // @IsOptional()
//   // @IsString()
//   // address?: string;

//   // @IsIn(['admin', 'customer'])
//   // role: string;
// }
// src/user/dto/create-user.dto.ts
// src/user/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
