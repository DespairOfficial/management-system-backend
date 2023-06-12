import { IsNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RequestToProject, User } from '@prisma/client';

export class CreateRequestToJoinProjectDto implements Partial<RequestToProject> {
  @ApiProperty({
    example: 1,
    description: 'Id of a user, which wants to join',
  })
  @IsNumber()
  userId: User['id'];

  @ApiProperty({
    example: 1,
    description: 'Id of an project',
  })
  @IsString()
  projectId?: string;
}
