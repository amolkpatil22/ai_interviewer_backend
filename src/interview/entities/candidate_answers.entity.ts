import { CandidateAnswers } from '../schema/candidate_answers.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SubmitAnswerDto } from '../dto/submit_answer.dto';

export class CandidateAnswersEntity {
  constructor(
    @InjectModel(CandidateAnswers.name)
    private candidateAnswersModel: Model<CandidateAnswers>,
  ) {}

  async create(payload: {
    candidate_answer: string;
    session_id: Types.ObjectId;
    user_id: Types.ObjectId;
    submit_date: Date;
    question_id: Types.ObjectId;
  }) {
    try {
      return await this.candidateAnswersModel.create(payload);
    } catch (error: any) {
      throw error;
    }
  }

  async getAllBySessionId(session_id: Types.ObjectId) {
    try {
      return await this.candidateAnswersModel.find({ session_id });
    } catch (error: any) {
      throw error;
    }
  }
}
