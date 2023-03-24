import { VerificationService } from 'src/modules/users/verification/verification.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';

import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@ApiTags('Verification')
@Controller('verification')
export class VerificationController {
    constructor(private readonly verificationService: VerificationService) {}

    @ApiOperation({ summary: 'Verify user by code from email' })
    @ApiOkResponse()
    @Get()
    verifyByCode(@Query('code') verificationCode: string, @Req() requset: Request) {
        return this.verificationService.verifyUserByCode(requset.user.id, verificationCode);
    }
}
