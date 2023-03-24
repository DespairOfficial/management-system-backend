import { IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Team } from '@prisma/client';

export class JoinTeamDto implements Partial<Team> {
	@ApiProperty({
        example: 1,
        description: 'Id of a team',
    })
	@IsNumber()
	id: number;

}
