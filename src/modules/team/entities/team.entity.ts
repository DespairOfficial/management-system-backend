import { ApiProperty } from '@nestjs/swagger';
import { Team } from '@prisma/client';

export class TeamEntity implements Team {
    @ApiProperty({
        example: 1,
        description: 'Id of team',
    })
    id: number;

    @ApiProperty({
        example: 1,
        description: 'Id of team-creator',
    })
    userId: number;

    @ApiProperty({
        example: 'Monolith',
        description: 'Name of a team',
    })
    name: string;
}
