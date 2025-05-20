import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
// import { RequestMethod } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Middleware and global pipes
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  // Enable CORS for your frontend origin
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Check if we're in serverless mode (Vercel environment)
  if (process.env.VERCEL === '1') {
    // For Vercel (serverless) use app.listen(3000)
    await app.listen(3000);
  } else {
    // For other environments (e.g., local or traditional server)
    await app.listen(process.env.PORT ?? 3000);
  }
}

bootstrap();
