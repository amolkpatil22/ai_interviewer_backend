import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSessionDto } from './dto/create_session.dto';
import { SessionsEntity } from './entities/sessions.entity';
import { AccessTokenDataTypes } from 'src/common/types/accessToken.dto';
import { Types } from 'mongoose';
import { CandidateAnswersEntity } from './entities/candidate_answers.entity';
import { SubmitAnswerDto } from './dto/submit_answer.dto';
import { QuestionsEntity } from './entities/questions.entity';

@Injectable()
export class InterviewService {
  constructor(
    private sessionsEntity: SessionsEntity,
    private candidateAnswersEntity: CandidateAnswersEntity,
    private questionsEntity: QuestionsEntity,
  ) {}

  async create(
    createInterviewDto: CreateSessionDto,
    accessTokenDataDto: AccessTokenDataTypes,
  ) {
    const response = await this.sessionsEntity.create({
      ...createInterviewDto,
      user_id: accessTokenDataDto.user_id,
    });

    return {
      status: HttpStatus.CREATED,
      message: 'Session created successfully',
      data: response,
    };
  }

  async endSession(session_id: string) {
    const sessionData = await this.sessionsEntity.findOneById(
      new Types.ObjectId(session_id),
    );

    if (!sessionData) {
      throw new NotFoundException('Session not found');
    } else {
      const response = await this.sessionsEntity.update(
        new Types.ObjectId(session_id),
        {
          end_at: new Date(),
        },
      );
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Session Ended',
      };
    }
  }

  async submitAnswer(
    session_id: string,
    payload: SubmitAnswerDto,
    user: AccessTokenDataTypes,
  ) {
    const question = await this.questionsEntity.getQuestionById(
      new Types.ObjectId(payload.question_id),
    );

    if (!question) {
      throw new BadRequestException('Question not found');
    }

    const session = await this.sessionsEntity.findOneById(
      new Types.ObjectId(session_id),
    );

    if (!session) {
      throw new BadRequestException('Session not found');
    }

    const submitPayload = {
      session_id: new Types.ObjectId(session_id),
      question_id: new Types.ObjectId(payload.question_id),
      user_id: new Types.ObjectId(user.user_id),
      candidate_answer: payload.candidate_answer,
      submit_date: new Date(),
    };
    const response = await this.candidateAnswersEntity.create(submitPayload);

    return {
      status: HttpStatus.CREATED,
      message: 'Answer submitted',
      data: response,
    };
  }
}
