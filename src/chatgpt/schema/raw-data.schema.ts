import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ strict: false, collection: 'raw_data' }) // strict: false allows extra fields
export class RawData extends Document {
  @Prop({ type: Object }) // Store the object as-is
  data: Record<string, any>;
}

export const rawDataSchema = SchemaFactory.createForClass(RawData);
