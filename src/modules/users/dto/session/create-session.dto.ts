import { JWT_TOKEN_EXAMPLE } from '../../../../constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsIP, IsISO8601, IsString } from '@nestjs/class-validator';

export class CreateSessionDto {
  @ApiProperty({
    example: JWT_TOKEN_EXAMPLE,
    description: 'Refresh token',
  })
  @IsString({ message: 'Must be string' })
  readonly refreshToken: string;

  @ApiProperty({
    example:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
    description: 'User agent of browser',
  })
  @IsString({ message: 'Must be string' })
  readonly userAgent: string;

  @ApiProperty({
    example: '1ab-23',
    description: 'Fingerprint of browser',
  })
  @IsString({ message: 'Must be string' })
  readonly fingerprint: string;

  @ApiProperty({
    example: '192.168.0.1',
    description: 'IP',
  })
  @IsIP(4)
  readonly ip: string;

  @ApiProperty({
    example: '2023-03-14T10:54:26.561Z',
    description: 'Exites at time ',
  })
  @IsISO8601()
  readonly expiresAt: Date;
}
