import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'candidate_answer_feedback' })
export class CandidateAnswerFeedback {
  @Prop({ required: true })
  answer_id: Types.ObjectId;

  @Prop()
  understanding_of_question: number;

  @Prop()
  accuracy_of_answer: number;

  @Prop()
  subject_knowledge: number;

  @Prop()
  quality_of_answer: number;

  @Prop()
  what_went_well: string;

  @Prop()
  what_went_wrong: string;
}

export const candidateAnswerFeedbackSchema = SchemaFactory.createForClass(
  CandidateAnswerFeedback,
);
