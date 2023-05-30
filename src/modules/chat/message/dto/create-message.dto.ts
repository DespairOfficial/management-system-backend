import { CreateAttachmentDto } from './../attachment/dto/create-attachment.dto';
import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MessageContentType } from '@prisma/client';

export class CreateMessageDto {
  @ApiProperty({
    example: 1,
    description: 'Id of a conversation',
  })
  @IsNumber()
  conversationId: number;

  @ApiProperty({
    example: 'We need to fire our backend developer',
    description: 'Id of a conversation',
  })
  @IsString()
  body: string;

  @ApiProperty({
    example: 'text',
    description: 'Text or image message',
  })
  @IsOptional()
  contentType: MessageContentType;

  @ApiProperty({
    example: 'DEBUGGING',
    description: 'DEBUGGING',
  })
  @IsOptional()
  attachments: CreateAttachmentDto[];
}
