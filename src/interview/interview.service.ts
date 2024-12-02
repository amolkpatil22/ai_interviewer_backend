import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionsEntity } from './entities/sessions.entity';
import { AccessTokenDataDto } from 'src/common/types/accessToken.dto';
import { Types } from 'mongoose';

@Injectable()
export class InterviewService {
  constructor(private sessionsEntity: SessionsEntity) {}

  async create(
    createInterviewDto: CreateSessionDto,
    accessTokenDataDto: AccessTokenDataDto,
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
}
