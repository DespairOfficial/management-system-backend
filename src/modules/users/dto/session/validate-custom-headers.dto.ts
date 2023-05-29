import { ApiProperty } from '@nestjs/swagger';
import { IsString } from '@nestjs/class-validator';

export class ValidateCustomHeadersDto {
  @ApiProperty({
    example:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
    description: 'User agent of browser',
  })
  @IsString({ message: 'Header user-agent ust be string' })
  readonly userAgent: string;

  @ApiProperty({
    example: '1ab-23',
    description: 'Header - fingerprint of browser',
  })
  @IsString({ message: 'Header fingerprint must be string' })
  readonly fingerprint: string;
}
