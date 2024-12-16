import { InjectModel } from '@nestjs/mongoose';
import { Categories } from '../schema/categories.schema';
import { Model } from 'mongoose';

export class CategoriesEntity {
  constructor(
    @InjectModel(Categories.name)
    private categoriesModel: Model<Categories>,
  ) {}
  async getAll() {
    try {
      return await this.categoriesModel.find();
    } catch (error: unknown) {
      throw error;
    }
  }
}
