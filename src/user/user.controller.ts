import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../interfaces/User.interface';
import { UserService } from './user.service';

@ApiTags('User')
// @UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

	@ApiOperation({ summary: 'Get all users' })
    @ApiResponse({
        status: 200,
        type: OmitType(User, ['uid', 'password']),
    })
    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers()
    }


    @ApiOperation({ summary: 'Create a user' })
    @ApiResponse({
        status: 200,
        type: OmitType(User, ['uid', 'password']),
    })
    @Put()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @ApiOperation({ summary: 'Delete a user' })
    @Delete()
    async deleteUser(@Req() request: Request) {
        const result = this.userService.deleteUser(request.user.uid);
        delete request.user;
        return result;
    }
}
