import { ApiProperty } from '@nestjs/swagger';

export class UpdateNoteDto {
  @ApiProperty({ example: 'Note Title', description: 'title fot note' })
  readonly title: string;

  @ApiProperty({
    example: 'Some text content',
    description: 'text content of note',
  })
  readonly content: string;

  updatedAt: Date;
}
