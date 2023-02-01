import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../interfaces/User.interface';
import { UserRepository } from './user.repository';
import { Token } from 'src/interfaces/Token.interface';
import { UNKOWN_INTERNAL_ERROR } from 'src/constants';
@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

	async getAllUsers(): Promise<User[]>{
		try {
            return await this.userRepository.getAll()
        } catch (error) {
			console.log(error)
            throw new InternalServerErrorException(UNKOWN_INTERNAL_ERROR);
        }
	}

    async findById(uid: string): Promise<User> {
        try {
            return await this.userRepository.findById(uid);
        } catch (error) {
            throw new InternalServerErrorException(UNKOWN_INTERNAL_ERROR);
        }
    }

    async findByEmail(email: string): Promise<User> {
        try {
            return await this.userRepository.findByEmail(email);
        } catch (error) {
            throw new InternalServerErrorException(UNKOWN_INTERNAL_ERROR);
        }
    }
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        try {
            return await this.userRepository.create(createUserDto);
        } catch (error) {
            throw new InternalServerErrorException(UNKOWN_INTERNAL_ERROR);
        }
    }

    async setNewRefreshToken(uid: string, new_token: Token) {
        try {
            return await this.userRepository.setRefreshToken(uid, new_token);
        } catch (error) {
            throw new InternalServerErrorException(UNKOWN_INTERNAL_ERROR);
        }
    }
    async findByRefreshToken(refreshToken: Token): Promise<User> {
        try {
            return await this.userRepository.getByRefreshToken(refreshToken);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(UNKOWN_INTERNAL_ERROR);
        }
    }
    async deleteUser(uid: string) {
        try {
            return await this.userRepository.deleteById(uid);
        } catch (error) {
            throw new InternalServerErrorException(UNKOWN_INTERNAL_ERROR);
        }
    }
    async logout(uid: string) {
        try {
            return await this.userRepository.deleteRefreshToken(uid);
        } catch (error) {
            throw new InternalServerErrorException(UNKOWN_INTERNAL_ERROR);
        }
    }
}
