import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'sub_categories' })
export class SubCategories {
  @Prop({ required: true })
  category_id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export const subCategoriesSchema = SchemaFactory.createForClass(SubCategories);
