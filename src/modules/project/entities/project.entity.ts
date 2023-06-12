import { ApiProperty } from '@nestjs/swagger';
import { Project, User } from '@prisma/client';

export class ProjectEntity implements Project {
  @ApiProperty({
    example: '01887b7e-c553-765c-94c2-16bef2666fdf',
    description: 'Id of a project',
  })
  id: string;

  @ApiProperty({
    example: '01887b7e-c553-765c-94c2-16bef2666fdf',
    description: 'Id of an project creator',
  })
  userId: User['id'];

  @ApiProperty({
    example: 'New cool project',
    description: 'Name of an project',
  })
  name: string;

  @ApiProperty({
    example: 'projects/sauodf-asdg-asdf-img.jpg',
    description: 'Image of a project',
  })
  image: string;

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
