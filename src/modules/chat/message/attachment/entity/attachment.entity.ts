import { Attachment, Message, MessageContentType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class AttachmentEntity implements Attachment {
  @ApiProperty({
    example: 2,
    description: 'Id of user',
  })
  id: number;

  @ApiProperty({
    example: 143,
    description: 'Id of a message',
  })
  messageId: number;

  @ApiProperty({
    example: 'dp.gpg',
    description: 'Name of a file',
  })
  name: string;

  @ApiProperty({
    example: 56799899,
    description: 'Size of a file',
  })
  size: number;

  @ApiProperty({
    example: 'image/png',
    description: 'Size of a file',
  })
  type: string;

  @ApiProperty({
    example: 'attachments/809709-asdf.png',
    description: 'Size of a file',
  })
  path: string;

  @ApiProperty({
    example: '2023-03-22T08:50:01.930Z',
    description: 'Date of creation',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-03-22T08:50:01.930Z',
    description: 'Date of modification',
  })
  updatedAt: Date;
}
