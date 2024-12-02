import { InjectModel } from '@nestjs/mongoose';
import { Questions } from '../schema/questions.schema';
import { Model, Types } from 'mongoose';

export class QuestionsEntity {
  constructor(
    @InjectModel(Questions.name)
    private questionsModel: Model<Questions>,
  ) {}

  async getQuestionById(_id: Types.ObjectId) {
    try {
      return await this.questionsModel.findById(_id);
    } catch (error: any) {
      throw error;
    }
  }
}
