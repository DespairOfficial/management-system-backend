import { IsNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Team } from '@prisma/client';

export class CreateTeamDto implements Partial<Team> {
	@ApiProperty({
        example: 'Monolith',
        description: 'Name of a team',
    })
	@IsString()
	name: string;

	@ApiProperty({
        example: 1,
        description: 'Name of a team',
    })
	@IsNumber()
	disciplineId: number;

}
