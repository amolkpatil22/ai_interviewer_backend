import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Sessions {
  @Prop({ required: true, type: Types.ObjectId })
  user_id: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId })
  category_id: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId })
  sub_category_id: Types.ObjectId;

  @Prop({ default: () => new Date() })
  start_at: Date;

  @Prop()
  end_at: Date;
}

export const SessionsSchema = SchemaFactory.createForClass(Sessions);
