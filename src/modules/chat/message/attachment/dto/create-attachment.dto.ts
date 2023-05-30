import { Attachment, Message, MessageContentType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAttachmentDto {


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
    description: 'type of a file',
  })
	type: string;

	@ApiProperty({
    example: 'X08',
    description: 'Buffer - file',
  })
	file: Buffer;

 
}
