import { Socket } from 'socket.io';
import { CanActivate, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
@Injectable()
export class WsGuard implements CanActivate {
    constructor() {}
    canActivate(context: ExecutionContextHost): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
        const ctx = context.switchToWs();
        const client: Socket = ctx.getClient();
        if (client.handshake.headers.authorization) {
			const bearer = client.handshake.headers.authorization.split(' ')[0];
            const token = client.handshake.headers.authorization.split(' ')[1];
            try {
                const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as any;
                if (user && bearer === 'bearer') {
                    return true;
                }
            } catch (err) {
                console.log(err);
                return false;
				
            }
        }
        return false
    }
}
