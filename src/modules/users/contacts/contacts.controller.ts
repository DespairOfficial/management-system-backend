import { AddToContactsDto } from './dto/add-to-contacts.dto';
import { UserInfoEntity } from './../entities/user-info.entity';
import { Controller, Req, UseGuards, BadRequestException, Get, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
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

  @ApiOperation({ summary: 'Add user to contacts for current user' })
  @ApiCreatedResponse({
    schema: {
      example: 2,
    },
  })
  @Post()
  async addToContacts(@Req() request: Request, @Body() addToContactsDto: AddToContactsDto) {
    try { 
      return await this.contactsService.add(request.user.id, addToContactsDto);
    } catch (error) {
      throw new BadRequestException(BAD_TARGET);
    }
  }
}
