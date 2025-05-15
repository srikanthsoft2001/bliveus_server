import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // // Enable CORS for your frontend origin
  // app.enableCors({
  //   origin: 'http://localhost:5173/',
  //   credentials: true,
  // });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('bliveus API')
    .setDescription('Bliveus API for Ecommerce Website')
    .setVersion('1.0')
    // .addTag('cats')
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
