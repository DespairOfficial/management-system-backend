import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailCodeDto {
  @ApiProperty({
    example: '123456',
    description: 'Verification code',
  })
  @IsString()
  code: string;
}
