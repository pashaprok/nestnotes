import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.io', description: 'user email' })
  readonly email: string;

  @ApiProperty({ example: 'UserSecurePassword', description: 'user password' })
  readonly password: string;

  @ApiProperty({ example: 'MyName', description: 'user name' })
  name: string;
}
