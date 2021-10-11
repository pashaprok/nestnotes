import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ example: 'Note Title', description: 'title fot note' })
  @IsNotEmpty({ message: 'Can not be empty!' })
  readonly title: string;

  @ApiProperty({
    example: 'Some text content',
    description: 'text content of note',
  })
  @IsNotEmpty({ message: 'Can not be empty!' })
  readonly content: string;
}
