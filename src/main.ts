// import { NestFactory, Reflector } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import * as cookieParser from 'cookie-parser';
// import { RolesGuard } from './auth/roles.guard';

// import * as dotenv from 'dotenv';
// dotenv.config();

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Enable cookie parsing for reading JWT from cookies
//   app.use(cookieParser());

//   // Enable CORS for your frontend
//   app.enableCors({
//     origin: 'http://localhost:5173', // ✅ Match this with your frontend URL
//     credentials: true,
//   });

//   // Swagger setup
//   const config = new DocumentBuilder()
//     .setTitle('Bliveus API')
//     .setDescription('API docs for Bliveus App')
//     .setVersion('1.0')
//     .build();

//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document); // Available at http://localhost:3000/api

//   // Global role-based access control
//   const reflector = app.get(Reflector);
//   app.useGlobalGuards(new RolesGuard(reflector));

//   // Start the application
//     await app.listen(process.env.PORT || 3000);

//   //const app = await NestFactory.create(AppModule);
//  //app.useGlobalPipes(new ValidationPipe());
// }

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap()
 {
  const app = await NestFactory.create(AppModule);
   app.useGlobalPipes(new ValidationPipe());
   app.use(cookieParser());
   app.setGlobalPrefix('api');

   await app.listen(process.env.PORT || 3000);
  }
bootstrap();