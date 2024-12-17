import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { InterviewModule } from './interview/interview.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { ChatgptService } from './chatgpt/chatgpt.service';
import { ChatgptModule } from './chatgpt/chatgpt.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config globally available
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URL'), // Replace with your MongoDB URI
      }),
      inject: [ConfigService], // Optional, if you're using ConfigService
    }),
    UserModule,
    AuthModule,
    InterviewModule,
    ChatgptModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatgptService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        'auth/(.*)',
        'user/create-user',
        { path: '/', method: RequestMethod.ALL },
        { path: 'interview/get-all-categories', method: RequestMethod.GET },
        {
          path: 'interview/get-sub-categories-by-category-id/:category_id',
          method: RequestMethod.GET,
        },
      )
      .forRoutes('*');
  }
}
