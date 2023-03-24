import { ApiProperty } from '@nestjs/swagger';
import { Team } from '@prisma/client';

export class UpdateTeamDto implements Partial<Team> {
    @ApiProperty({
        example: 'Monolith',
        description: 'Name of a team',
    })
	name: string;
}
