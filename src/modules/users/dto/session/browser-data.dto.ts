import { ApiProperty } from '@nestjs/swagger';
import { IsIP, IsString } from '@nestjs/class-validator';

export class BrowserDataDto {
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
}
