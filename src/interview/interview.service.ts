import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { SessionsEntity } from './entities/sessions.entity';
import { AccessTokenDataDto } from 'src/common/types/accessToken.dto';

@Injectable()
export class InterviewService {
  constructor(private sessionsEntity: SessionsEntity) {}

  async create(
    createInterviewDto: CreateSessionDto,
    accessTokenDataDto: AccessTokenDataDto,
  ) {
    console.log(accessTokenDataDto.user_id);
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

  findAll() {
    return `This action returns all interview`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interview`;
  }

  update(id: number, updateInterviewDto: UpdateInterviewDto) {
    return `This action updates a #${id} interview`;
  }

  remove(id: number) {
    return `This action removes a #${id} interview`;
  }
}
