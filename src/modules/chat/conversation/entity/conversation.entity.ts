import { Conversation } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ConversationEntity implements Conversation {
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
}
