import { UserInfoEntity } from './../../users/entities/user-info.entity';
import { UserEntity } from './../../users/entities/user.entity';
import { JWT_TOKEN_EXAMPLE } from './../../../constants';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
export class AuthResponseDto {
  @ApiProperty({
    type: UserInfoEntity,
  })
  user: UserInfoEntity;
  @ApiProperty({
    example: JWT_TOKEN_EXAMPLE,
  })
  accessToken: string;
}
