import { IsBoolean, IsISO8601, IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from '@prisma/client';

export class CreateProjectDto implements Partial<Project> {

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
        description: 'Allowed number of participants',
    })
    numberOfParticipants: number;
}
