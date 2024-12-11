import { InjectModel } from '@nestjs/mongoose';
import { chatGptToken } from '../schema/chatgpt.schema';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

export class ChatgptEntity {
  constructor(
    @InjectModel(chatGptToken.name)
    private readonly chatGptTokenModel: Model<chatGptToken>,
  ) {}

  async update(payload: chatGptToken) {
    try {
      const TokenData = await this.chatGptTokenModel.findOne({
        modelName: payload.modelName,
      });
      if (!TokenData) {
        return await this.chatGptTokenModel.create(payload);
      } else {
        TokenData.incomingTokens =
          TokenData.incomingTokens + payload.incomingTokens;
        TokenData.outgoingTokens =
          TokenData.outgoingTokens + payload.outgoingTokens;
        TokenData.total = TokenData.total + payload.total;
        return await this.chatGptTokenModel.updateOne(
          { modelName: TokenData.modelName },
          TokenData,
        );
      }
    } catch (error: unknown) {
      throw error;
    }
  }
}
