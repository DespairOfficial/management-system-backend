import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { accessTokenOptions } from 'src/config/jwtOptions';
import { NOT_AUTHORIZED, NOT_AUTHORIZED_OR_BAD_TOKEN } from 'src/constants';
import { User } from 'src/interfaces/User.interface';

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
            return true;
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException({ message: NOT_AUTHORIZED_OR_BAD_TOKEN });
        }
    }
}
