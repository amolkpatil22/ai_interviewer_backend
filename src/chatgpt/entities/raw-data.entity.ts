import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RawData } from '../schema/raw-data.schema';

@Injectable()
export class RawDataEntity {
  constructor(
    @InjectModel(RawData.name) private readonly rawObjectModel: Model<RawData>,
  ) {}

  async saveObject(obj: Record<string, any>) {
    try {
      return await this.rawObjectModel.create({ ...obj });
    } catch (error: unknown) {
      console.log('🚀 ~ RawDataEntity ~ saveObject ~ error:', error);
    }
  }
}
