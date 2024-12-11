import { Module } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { chatGptToken, chatGptTokenSchema } from './schema/chatgpt.schema';
import { ChatgptEntity } from './entities/chatgpt.entity';
import { RawData, rawDataSchema } from './schema/raw-data.schema';
import { RawDataEntity } from './entities/raw-data.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: chatGptToken.name, schema: chatGptTokenSchema },
      { name: RawData.name, schema: rawDataSchema },
    ]),
  ],
  providers: [ChatgptService, ChatgptEntity, RawDataEntity],
  exports: [ChatgptService, ChatgptEntity, RawDataEntity],
})
export class ChatgptModule {}
