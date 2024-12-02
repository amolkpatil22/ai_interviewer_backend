import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'model_answers' })
export class ModelAnswers {
  @Prop()
  question_id: Types.ObjectId;

  @Prop()
  model_answer: string;
}

export const ModelAnswersSchema = SchemaFactory.createForClass(ModelAnswers);
