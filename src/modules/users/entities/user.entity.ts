import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { TeamEntity } from 'src/modules/team/entities/team.entity';
import { PasswordEntity } from './password.enitity';

export class UserEntity implements User {
    @ApiProperty({
        example: '1',
        description: 'Id of user',
    })
    id: number;

    @ApiProperty({
        example: 'user@mail.com',
        description: 'Email of user',
    })
    email: string;

    @ApiProperty({
        example: '+79876543210',
        description: 'Phone number of user',
    })
    phone: string;

    @ApiProperty({
        example: 'Denis',
        description: 'Firstname of user',
    })
    firstName: string;

    @ApiProperty({
        example: 'Wolf',
        description: 'Lastname of user',
    })
    lastName: string;

    @ApiProperty({
        example: 'Sergeevich',
        description: 'Middlename, patronymic of user',
    })
    patronymic: string;

    @ApiProperty({
        example: 'true',
        description: 'Untolerate boolean gender picker: true for Male, false for Female',
    })
    gender: boolean;

    @ApiProperty({
        example: 'false',
        description: 'Is user verified',
    })
    isVerified: boolean;

    @ApiProperty({
        example: '123456',
        description: 'Verification code to verify user',
    })
    verificationCode: string;

    @ApiProperty({
        example: 'c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e',
        description: 'Code for referal link',
    })
    referalCode: string;

    @ApiProperty({
        example: 'true',
        description: 'Is profile public',
    })
    isPublicProfile: boolean;

    @ApiProperty({
        example: 'me.jpg',
        description: 'Photo of profile',
    })
    photo: string;

    @ApiProperty({
        example: '11.01.2011',
        description: 'Birth date',
    })
    birthDate: Date;

    @ApiProperty({
        example: 178,
        description: 'Height in metric sys',
    })
    height: number;

    @ApiProperty({
        example: 78,
        description: 'Weight in metric sys',
    })
    weight: number;

	@ApiProperty({
        example: 22,
        description: 'Full age of user in years',
    })
    age: number;

    @ApiProperty({
        example: 'Puskina, 42',
        description: 'Address: home, palace',
    })
    address: string;
    @ApiProperty({
        example: 'Kazan',
        description: 'City',
    })
    city: string;
    @ApiProperty({
        example: 'Pervomayskiy',
        description: 'District',
    })
    district: string;

    @ApiProperty({
        example: 'Tatarstan',
        description: 'Region',
    })
    region: string;

    @ApiProperty({
        type: PasswordEntity,
    })
    password?: PasswordEntity;

	@ApiProperty({
		type: [TeamEntity]
	})
    teams?: TeamEntity[];

}
