import { InjectModel } from '@nestjs/mongoose';
import { ModelAnswers } from '../schema/model_answers.schema';
import { Model, Types } from 'mongoose';

export class ModelAnswersEntity {
  constructor(
    @InjectModel(ModelAnswers.name)
    private ModelAnswersModel: Model<ModelAnswers>,
  ) {}

  async getModelAnswerByQuestionId(question_id: Types.ObjectId) {
    try {
      return await this.ModelAnswersModel.findOne({ question_id: question_id });
    } catch (error: any) {
      throw error;
    }
  }
}
