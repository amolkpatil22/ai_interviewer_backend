import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';

export class UserEntity {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(payload: CreateUserDto) {
    try {
      return await this.userModel.create(payload);
    } catch (error: any) {
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.userModel.findOne({ email: email });
    } catch (error: any) {
      throw error;
    }
  }
}
