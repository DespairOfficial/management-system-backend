import { Controller, Get, UseGuards, Req, Query } from '@nestjs/common';

import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { VerifyEmailCodeDto } from './dto/verify-email-code.dto';
import { VerificationService } from './verification.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Verification')
@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @ApiOperation({ summary: 'Verify user by code from email' })
  @ApiOkResponse()
  @Get()
  verifyEmailByCode(@Query() verifyEmailCodeDto: VerifyEmailCodeDto, @Req() requset: Request) {
    return this.verificationService.verifyEmailByCode(requset.user.id, verifyEmailCodeDto);
  }
}
