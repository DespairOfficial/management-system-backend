import { UserInfoEntity } from './../entities/user-info.entity';
import { Body, Controller, Patch, Req, UseGuards, BadRequestException, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BAD_TARGET } from '../../../constants';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ContactsService } from './contacts.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @ApiOperation({ summary: 'Get contacts for current user' })
  @ApiOkResponse({
    type: UserInfoEntity,
  })
  @Get()
  async updateUser(@Req() request: Request) {
    try {
      return await this.contactsService.findMany(request.user.id);
    } catch (error) {
      throw new BadRequestException(BAD_TARGET);
    }
  }
}
