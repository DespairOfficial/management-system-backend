import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString, Length } from '@nestjs/class-validator';
import { User } from '@prisma/client';

export class CreateUserDto implements Partial<User> {

    @ApiProperty({
        example: 'user@mail.com',
        description: 'Email of user, unique ',
    })
    @IsString({ message: 'Must be string' })
    @IsEmail({}, { message: 'Must be email' })
    readonly email: string;

    @ApiProperty({
        example: 'Denis',
        description: 'Firstname of a user',
    })
    @IsString({ message: 'Must be string' })
    readonly firstName: string;

    @ApiProperty({
        example: 'Wolf',
        description: 'Lstname of a user',
    })
    @IsString({ message: 'Must be string' })
    readonly lastName: string;

	

}
