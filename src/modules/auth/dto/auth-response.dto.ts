import { UserInfoDto } from './../../users/dto/user/user-info.dto';
import { UserEntity } from './../../users/entities/user.entity';
import { JWT_TOKEN_EXAMPLE } from './../../../constants';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
export class AuthResponseDto {
    @ApiProperty({
        type: UserInfoDto,
    })
    user: UserInfoDto;
    @ApiProperty({
        example: JWT_TOKEN_EXAMPLE,
    })
    accessToken: string;
}
