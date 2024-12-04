import { Injectable } from '@nestjs/common';
import { CreateChatgptDto } from './dto/create-chatgpt.dto';
import { UpdateChatgptDto } from './dto/update-chatgpt.dto';
import { UserCommandMessageDto } from 'src/common/interfaces/messageJson.dto';
import {
  AxiosService,
  BaseAPI,
} from 'src/axios_interceptor/axios_interceptor.service';
import { ChatGptPayloadDto } from './dto/chatgpt-payload.dto';
import { ConfigService } from '@nestjs/config';
import { systemCommandMessage } from 'src/common/command_prompt/command_prompt';

@Injectable()
export class ChatgptService {
  private readonly axiosService: AxiosService;
  private configService: ConfigService;
  constructor() {
    this.axiosService = new AxiosService('chatGpt'); // Pass base URL here
  }

  getFeedBack(messageJson: UserCommandMessageDto[]) {
    let finalPayload: ChatGptPayloadDto = {
      model: this.configService.get('GPT_MODEL'),
      message: [systemCommandMessage],
      temperature: 0,
    };

    messageJson.forEach((item) => {
      finalPayload.message.push({
        role: 'user',
        content: JSON.stringify(item),
      });
    });

    // const gptResponse = this.axiosService.post('/completions', finalPayload);
    // return gptResponse;
    return finalPayload
  }
}
