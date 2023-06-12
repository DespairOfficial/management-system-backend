import { Type } from '@nestjs/class-transformer';
import { IsISO8601, IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from '@prisma/client';

export class CreateProjectDto implements Partial<Project> {
  @ApiProperty({
    example: 'New cool project',
    description: 'Name of an project',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 200,
    description: 'budget in dollars',
  })
  @IsNumber()
  @Type(() => Number)
  budget: number;

  @ApiProperty({
    example: 'Very perspective startup to earn a lot of money',
    description: 'Description of an project',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'ended',
    description: 'Current status of a project',
  })
  @IsString()
  status: string;

  @ApiProperty({
    example: 'projects/sauodf-asdg-asdf-img.jpg',
    description: 'Image of a project',
  })
  @IsOptional()
  image: string;

  @ApiProperty({
    example: '2023-03-22T08:50:01.930Z',
    description: 'When project starts',
  })
  @IsISO8601({ strict: true })
  @Type(() => String)
  startsAt: Date;
}
