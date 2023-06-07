import { IsEmail, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddContributorToFileDto {
  @ApiProperty({
    example: 'user@mail.com',
    description: 'email of a new contributor',
  })
	@IsString()
	@IsEmail()
  contributorEmail: string
}
