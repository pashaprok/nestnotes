import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'user@mail.io', description: 'user email' })
  readonly email: string;

  @ApiProperty({ example: 'UserSecurePassword', description: 'user password' })
  readonly password: string;
}
