import { IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RequestToProject } from '@prisma/client';

export class CreateRequestToJoinProjectDto implements Partial<RequestToProject> {
  @ApiProperty({
    example: 1,
    description: 'Id of a user, which wants to join',
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'Id of an project',
  })
  @IsNumber()
  projectId?: number;
}
