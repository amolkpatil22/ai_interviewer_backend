import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'candidate_answers' })
export class CandidateAnswers {
  @Prop({ isRequired: true })
  user_id: Types.ObjectId;

  @Prop({ isRequired: true })
  question_id: Types.ObjectId;

  @Prop({ isRequired: true })
  session_id: Types.ObjectId;

  @Prop({ isRequired: true })
  candidate_answer: string;

  @Prop({ isRequired: true })
  submit_date: Date;
}

export const CandidateAnswersSchema =
  SchemaFactory.createForClass(CandidateAnswers);
