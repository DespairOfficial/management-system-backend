import { Message } from '@prisma/client';
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
    userId: number;

    @ApiProperty({
        example: 'We need to fire our backend developer',
        description: 'Text of a messge',
    })
    text: string;

    @ApiProperty({
        example: '2023-03-22T08:50:01.930Z',
        description: 'Date of creation',
    })
    createdAt: Date;
}
