import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString, Length } from '@nestjs/class-validator';

export class RegisterUserDto {
    @ApiProperty({
        example: 'user@mail.com',
        description: 'Email of user, unique ',
    })
    @IsString({ message: 'Must be string' })
    @IsEmail({}, { message: 'Must be email' })
    readonly email: string;

    @ApiProperty({
        example: '+79876543210',
        description: 'Phone number ',
    })
    @IsString({ message: 'Must be string' })
    @IsPhoneNumber()
    readonly phone: string;

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

    // @ApiProperty({
    //     example: '123456',
    //     description: 'Verification code',
    // })
    // @IsNumber()
    // readonly emailVerificationCode: number;

    @ApiProperty({
        example: 'asdf_1s!@41$#afafg9',
        description: 'Password. Stored in hased form',
    })
    @IsString({ message: 'Must be string' })
    @Length(8, 24, {
        message: 'Can not be shorter than 8 symbols',
    })
    readonly password: string;

}
