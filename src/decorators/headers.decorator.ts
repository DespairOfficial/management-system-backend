import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CustomHeaders = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return {
        userAgent: req.headers['user-agent'],
        fingerprint: req.headers['fingerprint'],
    };
    // return data ? req.headers.data : req.headers;
});
