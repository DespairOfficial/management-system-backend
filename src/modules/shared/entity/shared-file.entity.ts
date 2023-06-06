import { ApiProperty } from '@nestjs/swagger';
import { SharedFile } from '@prisma/client';

export class SharedFileEntity implements SharedFile {
  @ApiProperty({
    example: '01887b7e-c553-765c-94c2-16bef2666fdf',
    description: 'Id of file',
  })
  id: string;

	@ApiProperty({
    example: '01887b7e-c553-765c-94c2-16bef2666fdf',
    description: 'Id of a creator',
  })
  userId: string;

  @ApiProperty({
    example: 'flying_pudge',
    description: 'Name of a file',
  })
  name: string;

  @ApiProperty({
    example: 1920000,
    description: 'Size of a created file',
  })
  size: number;

  @ApiProperty({
    example: 'pdf',
    description: 'Extension of a file',
  })
  type: string;

  @ApiProperty({
    example: 'shared/7w9r6090-asdf79h-asdfk-jsd/7ew6r0w-6wer80-6wer69-flying_pudge.jpg',
    description: 'Path to static file',
  })
  url: string;

  @ApiProperty({
    example: '2023-03-22T08:50:01.930Z',
    description: 'File created',
  })
  dateCreated: Date;

  @ApiProperty({
    example: '2023-03-22T08:50:01.930Z',
    description: 'File modified',
  })
  dateModified: Date;
}
