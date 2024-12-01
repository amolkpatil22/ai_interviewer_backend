import { InjectModel } from '@nestjs/mongoose';
import { Sessions, SessionsSchema } from './sessions.schema';
import { Model, Types } from 'mongoose';
import { CreateSessionDto } from '../dto/create-session.dto';

export class SessionsEntity {
  constructor(
    @InjectModel(Sessions.name)
    private sessionsModel: Model<Sessions>,
  ) {}

  async create(payload: CreateSessionDto & { user_id: string }) {
    try {
      return await this.sessionsModel.create({
        user_id: new Types.ObjectId(payload.user_id),
        category_id: new Types.ObjectId(payload.category_id),
        sub_category_id: new Types.ObjectId(payload.sub_category_id),
        start_at: new Date(),
        end_at: new Date(),
      });
    } catch (error: any) {
      throw error;
    }
  }
}
