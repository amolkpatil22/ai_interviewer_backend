import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSessionDto } from './dto/create_session.dto';
import { SessionsEntity } from './entities/sessions.entity';
import { AccessTokenDataDto } from 'src/common/interfaces/accessToken.dto';
import { Types } from 'mongoose';
import { CandidateAnswersEntity } from './entities/candidate_answers.entity';
import { SubmitAnswerDto } from './dto/submit_answer.dto';
import { QuestionsEntity } from './entities/questions.entity';
import { ModelAnswersEntity } from './entities/model_answers.entity';
import { Sessions } from './schema/sessions.schema';
import { CandidateAnswers } from './schema/candidate_answers.schema';
import { ChatgptService } from 'src/chatgpt/chatgpt.service';
import { UserCommandMessageDto } from 'src/common/interfaces/messageJson.dto';
import { CategoriesEntity } from './entities/categories.entity';
import { SubCategoriesEntity } from './entities/sub_categories.entity';

@Injectable()
export class InterviewService {
  constructor(
    private sessionsEntity: SessionsEntity,
    private candidateAnswersEntity: CandidateAnswersEntity,
    private questionsEntity: QuestionsEntity,
    private modelAnswerEntity: ModelAnswersEntity,
    private chatGptService: ChatgptService,
    private categoriesEntity: CategoriesEntity,
    private subCategoryEntity: SubCategoriesEntity,
  ) {}

  async create(
    createSessionDto: CreateSessionDto,
    accessTokenDataDto: AccessTokenDataDto,
  ) {
    const sessionResponse = await this.sessionsEntity.create({
      ...createSessionDto,
      user_id: accessTokenDataDto.user_id,
    });

    const questions = await this.chatGptService.generateQuestions({
      category_id: createSessionDto.category_id,
      difficulty: createSessionDto.difficulty,
      sub_category_id: createSessionDto.sub_category_id,
      tech: createSessionDto.tech,
    });

    const QuestionsPayload = questions.map((item) => {
      return {
        ...item,
        category_id: new Types.ObjectId(createSessionDto.category_id),
        sub_category_id: new Types.ObjectId(createSessionDto.sub_category_id),
        difficulty: createSessionDto.difficulty,
      };
    });

    await this.questionsEntity.addQuestions(QuestionsPayload);

    return {
      sessionData: sessionResponse,
      questions: questions,
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
    user: AccessTokenDataDto,
  ) {
    const question = await this.questionsEntity.getQuestionById(
      new Types.ObjectId(payload.question_id),
    );

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    const session = await this.sessionsEntity.findOneById(
      new Types.ObjectId(session_id),
    );

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.end_at) {
      throw new BadRequestException('Session already ended');
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

  async generateReport(session_id: Types.ObjectId) {
    const session = await this.sessionsEntity.findOneById(session_id);
    if (!session) {
      throw new NotFoundException('Session not found');
    }
    const candidate_answers =
      await this.candidateAnswersEntity.getAllBySessionId(session_id);
    if (candidate_answers.length === 0) {
      throw new NotAcceptableException('Answers not found');
    }
    const messageJson = await this.buildMessageJson(candidate_answers);
    const response = this.chatGptService.getFeedBack(messageJson);
    return response;
  }

  async buildMessageJson(
    candidate_answers: CandidateAnswers[],
  ): Promise<UserCommandMessageDto[]> {
    const messageJson = candidate_answers.map(async (item) => {
      const question = await this.questionsEntity.getQuestionById(
        item.question_id,
      );
      const modelAnswer =
        await this.modelAnswerEntity.getModelAnswerByQuestionId(
          item.question_id,
        );
      console.log(
        '🚀 ~ InterviewService ~ messageJson ~ modelAnswer:',
        item.question_id,
      );

      return {
        question_id: question._id.toString(),
        question: question.question,
        model_answer: modelAnswer.model_answer,
        candidate_answer: item.candidate_answer,
      };
    });

    return Promise.all(messageJson);
  }

  async getAllCategories() {
    const response = await this.categoriesEntity.getAll();
    if (response.length === 0) {
      throw new NotFoundException('No Data Available');
    }
    return response;
  }

  async getSubCategoryByCategoryId(category_id: string) {
    const response = await this.subCategoryEntity.getByCategoryId(
      new Types.ObjectId(category_id),
    );
    if (response.length === 0) {
      throw new NotFoundException('No Data Available');
    }
    return response;
  }
}
