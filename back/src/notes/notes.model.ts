import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';

interface NoteCreationAttr {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({ tableName: 'notes' })
export class Note extends Model<Note, NoteCreationAttr> {
  @ApiProperty({ example: 1, description: 'unique note identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Note Title', description: 'title for note' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ example: 'Note Content', description: 'note content' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @ApiProperty({ example: 'Image', description: 'image for note' })
  @Column({
    type: DataType.STRING,
  })
  image: string;

  @ApiProperty({
    example: 1,
    description: 'the id of the user who owns the note',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
