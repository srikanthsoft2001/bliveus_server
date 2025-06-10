import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    ProductModule,
    UserModule,
    AuthModule,
    
 
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
