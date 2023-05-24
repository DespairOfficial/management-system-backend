import { UserInfoDto } from './dto/user/user-info.dto';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Body, Controller, Patch, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BAD_TARGET } from 'src/constants';

@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({ summary: 'update self user info' })
    @ApiOkResponse({
        type: UserInfoDto,
    })
    @Patch()
    async updateUser(@Body() updateUserDto: UpdateUserDto, @Req() request: Request) {
        try {
            return await this.usersService.update(request.user.id, updateUserDto);
        } catch (error) {
            throw new BadRequestException(BAD_TARGET);
        }
    }
}
