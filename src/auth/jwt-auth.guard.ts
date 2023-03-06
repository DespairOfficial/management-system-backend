import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { accessTokenOptions } from 'src/config/jwtOptions';
import { NOT_AUTHORIZED, NOT_AUTHORIZED_OR_BAD_TOKEN } from 'src/constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: NOT_AUTHORIZED });
            }
            const user: User = this.jwtService.verify(token);
            req.user = user;
	
			const refresh = req.cookies
			console.log(refresh)
            return true;
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException({ message: NOT_AUTHORIZED_OR_BAD_TOKEN });
        }
    }
}
