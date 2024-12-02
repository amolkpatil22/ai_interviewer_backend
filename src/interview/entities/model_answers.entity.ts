import { InjectModel } from '@nestjs/mongoose';
import { ModelAnswers } from '../schema/model_answers.schema';
import { Model } from 'mongoose';

export class ModelAnswersEntity {
  constructor(
    @InjectModel(ModelAnswers.name)
    private ModelAnswersModel: Model<ModelAnswers>,
  ) {}
}
