import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.io', description: 'user email' })
  @IsNotEmpty({ message: 'Can not be empty!' })
  @IsEmail({}, { message: 'Invalid email!' })
  readonly email: string;

  @ApiProperty({ example: 'UserSecurePassword', description: 'user password' })
  @IsNotEmpty({ message: 'Can not be empty!' })
  @IsString({ message: 'Must be string' })
  @Length(8, 50, { message: 'Must be greater than 8 chars and less 50' })
  readonly password: string;

  @ApiProperty({ example: 'MyName', description: 'user name' })
  @IsString({ message: 'Must be string' })
  name: string;
}
