import { Message, MessageContentType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class MessageEntity implements Message {
  @ApiProperty({
    example: '1',
    description: 'Id of user',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'Id of a related project',
  })
  projectId: number;

  @ApiProperty({
    example: 1,
    description: 'Id of a conversation',
  })
  conversationId: number;

  @ApiProperty({
    example: 1,
    description: 'Author of a message ',
  })
  senderId: number;

  @ApiProperty({
    example: 'We need to fire our backend developer',
    description: 'Text of a message or image path',
  })
  body: string;

  @ApiProperty({
    example: '2023-03-22T08:50:01.930Z',
    description: 'Date of creation',
  })
  createdAt: Date;

  @ApiProperty({
    example: '[img1, img2]',
    description: 'Attachments files array',
  })
  attachments: string[];

  @ApiProperty({
    example: 'text',
    description: 'Text or image message',
  })
  contentType: MessageContentType;
}
