import { InjectModel } from '@nestjs/mongoose';
import { SubCategories } from '../schema/sub_categories.schema';
import { Model, Types } from 'mongoose';

export class SubCategoriesEntity {
  constructor(
    @InjectModel(SubCategories.name)
    private subCategoriesModel: Model<SubCategories>,
  ) {}

  async getByCategoryId(category_id: Types.ObjectId) {
    try {
      return await this.subCategoriesModel.find({ category_id: category_id });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getById(sub_category_id: Types.ObjectId) {
    try {
      return await this.subCategoriesModel.findById(sub_category_id);
    } catch (error: unknown) {
      throw error;
    }
  }
}
