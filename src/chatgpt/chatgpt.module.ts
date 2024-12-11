import { Module } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { chatGptToken, chatGptTokenSchema } from './schema/chatgpt.schema';
import { ChatgptEntity } from './entities/chatgpt.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: chatGptToken.name, schema: chatGptTokenSchema },
    ]),
  ],
  providers: [ChatgptService,ChatgptEntity],
  exports: [ChatgptService, ChatgptEntity],
})
export class ChatgptModule {}
