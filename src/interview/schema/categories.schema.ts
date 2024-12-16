import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'categories', timestamps: true })
export class Categories {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export const categoriesSchema = SchemaFactory.createForClass(Categories);
