import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Ensure the config module is globally available
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow('MONGO_URI'), // Ensure MONGO_URI is set in your .env file
      }),
      inject: [ConfigService],
    }),
    UserModule, // Import UserModule here
  ],
  controllers: [AppController],  // AppController
  providers: [AppService],  // AppService
})
export class AppModule {
  constructor() {
    console.log('AppModule has been initialized');
  }
}
