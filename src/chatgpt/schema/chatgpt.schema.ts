import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, collection: 'gpt_tokens_count' })
export class chatGptToken {
  @Prop({ required: true })
  modelName: string;

  @Prop({ required: true })
  incomingTokens: number;

  @Prop({ required: true })
  outgoingTokens: number;

  @Prop({ required: true })
  total: number;
}

export const chatGptTokenSchema = SchemaFactory.createForClass(chatGptToken);
