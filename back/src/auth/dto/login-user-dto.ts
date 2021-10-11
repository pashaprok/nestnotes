import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { strongPasswordRegExp } from '../../constants/regex/password';

export class LoginUserDto {
  @ApiProperty({ example: 'user@mail.io', description: 'user email' })
  @IsNotEmpty({ message: 'Can not be empty!' })
  @IsEmail({}, { message: 'Invalid email!' })
  readonly email: string;

  @ApiProperty({ example: 'UserSecurePassword', description: 'user password' })
  @IsNotEmpty({ message: 'Can not be empty!' })
  @Length(8, 50, { message: 'Must be greater than 8 chars and less 50' })
  @Matches(strongPasswordRegExp, {
    message: 'Password must contain digits, lowercase and uppercase',
  })
  readonly password: string;
}
