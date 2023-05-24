import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
    @ApiProperty({
        example: 1,
        description: 'Id of a conversation',
    })
    conversationId: number;

    @ApiProperty({
        example: 'We need to fire our backend developer',
        description: 'Id of a conversation',
    })
    text: string;
}
