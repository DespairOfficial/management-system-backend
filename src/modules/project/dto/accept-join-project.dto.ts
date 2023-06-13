import { IsNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RequestToProject, User } from '@prisma/client';

export class AcceptJoinProjectDto implements Partial<RequestToProject> {

  @ApiProperty({
    example: 1,
    description: 'Id of an project',
  })
  @IsString()
  projectId?: string;
}
