import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Questions {
  @Prop()
  category_id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  description: string;

  @Prop()
  ideal_time: number;
}

export const QuestionsSchema = SchemaFactory.createForClass(Questions);
