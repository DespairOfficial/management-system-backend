import { Logger } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';
import * as cookieParser from 'cookie-parser';
import { PrismaClientExceptionFilter } from './filters/prisma-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('main');
  // parsing cookies from request.headers.cookie
  // transforming it from string to Js object and exposing in request.cookies
  // or request.signedCookies when secret is provided
  app.enableCors({ credentials: true, origin: true });

  app.use(cookieParser(process.env.COOKIES_SECRET));

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Management System API')
    .setDescription('Management System')
    .setVersion('1.0.1')
    .addTag('APP')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument);

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT, () => {
    logger.log(`Server is running on port: ${PORT}`);
  });
}
bootstrap();
