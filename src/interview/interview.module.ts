import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { SessionsEntity } from './entities/sessions.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Sessions, SessionsSchema } from './schema/sessions.schema';
import {
  CandidateAnswers,
  CandidateAnswersSchema,
} from './schema/candidate_answers.schema';
import { CandidateAnswersEntity } from './entities/candidate_answers.entity';
import {
  ModelAnswers,
  ModelAnswersSchema,
} from './schema/model_answers.schema';
import { ModelAnswersEntity } from './entities/model_answers.entity';
import { Questions, QuestionsSchema } from './schema/questions.schema';
import { QuestionsEntity } from './entities/questions.entity';
import { ChatgptService } from 'src/chatgpt/chatgpt.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sessions.name, schema: SessionsSchema },
      { name: CandidateAnswers.name, schema: CandidateAnswersSchema },
      { name: ModelAnswers.name, schema: ModelAnswersSchema },
      { name: Questions.name, schema: QuestionsSchema },
    ]),
  ],
  controllers: [InterviewController],
  providers: [
    InterviewService,
    SessionsEntity,
    CandidateAnswersEntity,
    ModelAnswersEntity,
    QuestionsEntity,
    ChatgptService,
  ],
})
export class InterviewModule {}
