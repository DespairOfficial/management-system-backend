import { ConversationType } from '../../../../@types/conversation';
import { UserInfoEntity } from './../../../users/entities/user-info.entity';
import { Conversation } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ConversationEntity implements Conversation {
  @ApiProperty({
    example: 1,
    description: 'Id of a conversation',
  })
  id: number;

  @ApiProperty({
    example: '01887b7e-c553-765c-94c2-16bef2666fdf',
    description: 'Id of a related project',
  })
  projectId: string;

  @ApiProperty({
    example: 1,
    description: 'Id of a related project',
  })
  type: ConversationType;

  @ApiProperty({
    type: UserInfoEntity,
  })
  participants: UserInfoEntity[];
}
