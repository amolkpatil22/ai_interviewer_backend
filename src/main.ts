import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  app.enableCors({
    origin: ['http://localhost:3000', 'https://smarthire-ai-interviewer.vercel.app'], // Allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    allowedHeaders: 'Content-Type, Accept, Authorization', // Allowed headers
    credentials: true, // If using cookies or authorization headers
  });

  app.use(cookieParser());

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads to DTO instances
      whitelist: true, // Strip properties that do not have any decorators
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are found
    }),
  );

  await app.listen(port);
  console.log('PORT', port);
}
bootstrap();
