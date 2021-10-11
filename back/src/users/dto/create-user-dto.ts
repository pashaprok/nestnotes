import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { strongPasswordRegExp } from '../../constants/regex/password';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.io', description: 'user email' })
  @IsNotEmpty({ message: 'Can not be empty!' })
  @IsEmail({}, { message: 'Invalid email!' })
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  @ApiProperty({ example: 'UserSecurePassword', description: 'user password' })
  @IsNotEmpty({ message: 'Can not be empty!' })
  @IsString({ message: 'Must be string' })
  @Length(8, 50, { message: 'Must be greater than 8 chars and less 50' })
  @Matches(strongPasswordRegExp, {
    message: 'Password must contain digits, lowercase and uppercase',
  })
  readonly password: string;

  @ApiProperty({ example: 'MyName', description: 'user name' })
  @IsString({ message: 'Must be string' })
  @Length(3, 255, { message: 'Must be greater than 3 chars and less 255' })
  name: string;
}
