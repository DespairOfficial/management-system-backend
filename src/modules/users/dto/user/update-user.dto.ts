import { User } from '@prisma/client';
import { IsBoolean, IsDate, IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto implements Partial<User> {
    @ApiProperty({
        example: 'user@mail.com',
        description: 'Email of user',
    })
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty({
        example: '+79876543210',
        description: 'Phone number of user',
    })
    @IsPhoneNumber()
    @IsString()
    phone: string;

    @ApiProperty({
        example: 'Denis',
        description: 'Firstname of user',
    })
    @IsString()
    firstName: string;

    @ApiProperty({
        example: 'Wolf',
        description: 'Lastname of user',
    })
    @IsString()
    lastName: string;

    @ApiProperty({
        example: 'Sergeevich',
        description: 'Middlename, patronymic of user',
    })
    @IsString()
	@IsOptional()
    patronymic: string;

    @ApiProperty({
        example: 'true',
        description: 'Untolerate boolean gender picker: true for Male, false for Female',
    })
    @IsBoolean()
    gender: boolean;

    @ApiProperty({
        example: 'true',
        description: 'Is profile public',
    })
    @IsBoolean()
	@IsOptional()
    isPublicProfile: boolean;

    @ApiProperty({
        example: 'me.jpg',
        description: 'Photo of profile',
    })
    @IsString()
	@IsOptional()
    photo: string;

    @ApiProperty({
        example: '11.01.2011',
        description: 'Birth date',
    })
    @IsDate()
	@IsOptional()
    birthDate: Date;

    @ApiProperty({
        example: 178,
        description: 'Height in metric sys',
    })
    @IsNumber()
	@IsOptional()
    height: number;

    @ApiProperty({
        example: 78,
        description: 'Weight in metric sys',
    })
    @IsNumber()
	@IsOptional()
    weight: number;

    @ApiProperty({
        example: 'Puskina, 42',
        description: 'Address: home, palace',
    })
    @IsString()
	@IsOptional()
    address: string;

    @ApiProperty({
        example: 'Kazan',
        description: 'City',
    })
    @IsString()
	@IsOptional()
    city: string;

    @ApiProperty({
        example: 'Pervomayskiy',
        description: 'District',
    })
    @IsString()
	@IsOptional()
    district: string;

    @ApiProperty({
        example: 'Tatarstan',
        description: 'Region',
    })
    @IsString()
	@IsOptional()
    region: string;
}
