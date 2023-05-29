import { ApiProperty } from '@nestjs/swagger';
import { Project } from '@prisma/client';

export class ProjectEntity implements Project {
  @ApiProperty({
    example: 1,
    description: 'Id of a project',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'Id of an project creator',
  })
  userId: number;

  @ApiProperty({
    example: 'New cool project',
    description: 'Name of an project',
  })
  name: string;

  @ApiProperty({
    example: 'Very perspective startup to earn a lot of money',
    description: 'Description of an project',
  })
  description: string;

  @ApiProperty({
    example: '2023-03-22T08:50:01.930Z',
    description: 'When project starts',
  })
  startsAt: Date;

  @ApiProperty({
    example: 10,
    description: 'Budget of a project',
  })
  budget: number;

  @ApiProperty({
    example: 'Ended',
    description: 'Current status of a project',
  })
  status: string;
}
