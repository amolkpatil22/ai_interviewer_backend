import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Questions {
  @Prop()
  category_id: Types.ObjectId;

  @Prop()
  sub_category_id: Types.ObjectId;

  @Prop()
  question: string;

  @Prop()
  type: string;

  @Prop()
  difficulty: string;

  @Prop()
  hint: string;
}

export const QuestionsSchema = SchemaFactory.createForClass(Questions);
