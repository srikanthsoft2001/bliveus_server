// src/users/dto/update-user.dto.ts
export class UpdateUserDto {
  readonly name?: string;
  readonly email?: string;
  readonly address?: string;
  readonly currentPassword?: string;
  readonly newPassword?: string;
}
