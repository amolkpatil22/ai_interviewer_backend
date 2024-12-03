import { Injectable } from '@nestjs/common';
import { CreateChatgptDto } from './dto/create-chatgpt.dto';
import { UpdateChatgptDto } from './dto/update-chatgpt.dto';
import { MessageJson } from 'src/common/types/messageJson.dto';
import {
  AxiosService,
  BaseAPI,
} from 'src/axios_interceptor/axios_interceptor.service';

@Injectable()
export class ChatgptService {
  private readonly axiosService: AxiosService;
  constructor() {
    this.axiosService = new AxiosService('chatGpt'); // Pass base URL here
  }
  getFeedBack(messageJson: MessageJson[]) {
    const gptApiInstance = this.axiosService.post();
  }
}
