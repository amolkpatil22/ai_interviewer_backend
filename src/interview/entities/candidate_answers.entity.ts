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
      // check if answer is already there or not, if your is retrying
      const answerData = await this.candidateAnswersModel.findOne({
        question_id: payload.question_id,
        session_id: payload.session_id,
      });

      if (!answerData) {
        return await this.candidateAnswersModel.create(payload);
      } else {
        return answerData;
      }
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
