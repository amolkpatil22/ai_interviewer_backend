import { InjectModel } from '@nestjs/mongoose';
import { CandidateAnswerFeedback } from '../schema/candidate_answer_feedback.schema';
import { Model } from 'mongoose';

export class CandidateAnswerFeedbackEntity {
  constructor(
    @InjectModel(CandidateAnswerFeedback.name)
    private candidateAnswerFeedbackModel: Model<CandidateAnswerFeedback>,
  ) {}

  async create(payload: CandidateAnswerFeedback) {
    try {
      return await this.candidateAnswerFeedbackModel.create(payload);
    } catch (error: unknown) {
      throw error;
    }
  }
}
