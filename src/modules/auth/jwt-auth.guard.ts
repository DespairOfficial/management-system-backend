import { accessTokenOptions } from 'src/config/jwtOptions';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { NOT_AUTHORIZED, NOT_AUTHORIZED_OR_BAD_TOKEN } from 'src/constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        const logger = new Logger('JwtAuthGuard');
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: NOT_AUTHORIZED });
            }
            const user: User = this.jwtService.verify(token, { secret: accessTokenOptions.secret });
            req.user = user;

            return true;
        } catch (error) {
            logger.error(error);
            throw new UnauthorizedException({ message: NOT_AUTHORIZED_OR_BAD_TOKEN });
        }
    }
}
