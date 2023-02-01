import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from 'src/constants';
import { Token } from 'src/interfaces/Token.interface';
import { User } from 'src/interfaces/User.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { accessTokenOptions, refreshTokenOptions } from '../config/jwtOptions';

@Injectable()
export class UserRepository implements IRepository<User> {
    constructor(@Inject(PG_CONNECTION) private db: Pool) {}

	async getAll(): Promise<User[]>{
		const result = await this.db.query(
            `SELECT * FROM public.users`,
        );
        const users: User[] = result.rows;
        return users;
	}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const result = await this.db.query(
            `INSERT INTO public.user (email,nickname,password) VALUES ('${createUserDto.email}', '${createUserDto.nickname}', '${createUserDto.password}') RETURNING *`,
        );
        const user: User = result.rows[0];
        return user;
    }

    async update(item: CreateUserDto): Promise<User> {
        throw new Error('Method not implemented.');
    }
    async deleteById(id: string | number): Promise<void> {
        const res = await this.db.query(`DELETE * FROM public.user where uid=${id}`);
        return res.rows[0];
    }

    async findByEmail(email: string) {
        const result = await this.db.query(`SELECT * FROM public.user WHERE "email" ='${email}' `);
        const user: User = result.rows[0];
        return user;
    }
    async findById(id: string | number): Promise<User> {
        const result = await this.db.query(`SELECT * FROM public.user WHERE "uid" ='${id}' `);
        const user: User = result.rows[0];
        return user;
    }
    async getByRefreshToken(refreshToken: Token) {
        const result = await this.db.query(`SELECT * FROM public.user WHERE "refresh_token" ='${refreshToken.token}' `);
        const user: User = result.rows[0];
        return user;
    }
    async getRefreshToken(uid: string): Promise<Token> {
        const result = await this.db.query(`SELECT refresh_token FROM public.user  WHERE "uid" ='${uid}'`);
        const token: string = result.rows[0];
        return { token: token, expiresIn: accessTokenOptions.expiresIn };
    }
    async setRefreshToken(uid: string, token: Token): Promise<Token> {
        const result = await this.db.query(
            `UPDATE public.user SET refresh_token = '${token.token}' WHERE "uid" ='${uid}' RETURNING refresh_token`,
        );
        const newToken = result.rows[0].refresh_token;
        return { token: newToken, expiresIn: refreshTokenOptions.expiresIn };
    }
    async deleteRefreshToken(uid: string) {
        const query = `UPDATE public.user SET "refresh_token" = NULL WHERE uid ='${uid}'`;
        const result = await this.db.query(query);
        return result;
    }
}
