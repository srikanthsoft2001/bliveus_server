import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Middleware and global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Enable cookie parser for reading refresh tokens in cookies
  app.use(cookieParser());

  // Enable CORS for frontend access with credentials
  app.enableCors({
    origin: 'http://localhost:5173', // your frontend origin
    credentials: true, // allow cookies to be sent
  });

  // Swagger documentation setup
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Listen on dynamic port or default 3000
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
