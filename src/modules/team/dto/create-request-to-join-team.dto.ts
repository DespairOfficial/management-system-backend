import { IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RequestToTeam, Team } from '@prisma/client';

export class CreateRequestToJoinTeamDto implements Partial<RequestToTeam> {
    @ApiProperty({
        example: 1,
        description: 'Id of a current user',
    })
    @IsNumber()
    userId: number;
    @ApiProperty({
        example: 1,
        description: 'Id of a team',
    })
    @IsNumber()
    teamId: number;
}
