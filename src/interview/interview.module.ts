import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { SessionsEntity } from './entities/sessions.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Sessions, SessionsSchema } from './entities/sessions.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sessions.name, schema: SessionsSchema },
    ]),
  ],
  controllers: [InterviewController],
  providers: [InterviewService, SessionsEntity],
})
export class InterviewModule {}
