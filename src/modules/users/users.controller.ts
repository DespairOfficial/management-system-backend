import { UserInfoEntity } from './entities/user-info.entity';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Body, Controller, Patch, Req, UseGuards, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
import { ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'update self user info' })
  @ApiOkResponse({
    type: UserInfoEntity,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Patch()
  async updateUser(
    @UploadedFile() image: Express.Multer.File,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: Request,
  ) {
    return await this.usersService.update(request.user.id, updateUserDto, image);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    type: [UserInfoEntity],
  })
  @Get()
  async getUsers() {
    return await this.usersService.findAll();
  }
}
