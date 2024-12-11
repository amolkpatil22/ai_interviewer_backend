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
import { generateQuestionCommand } from 'src/common/command_prompt/generate_questions';
import { GenerateQuestionDto } from './dto/generate-question.dto';
import { ChatGptResponseDto } from './dto/chatgpt-response.dto';
import { ChatgptEntity } from './entities/chatgpt.entity';
import { GenerateQuestionResponseDto } from './dto/generate-question-response.dto';

@Injectable()
export class ChatgptService {
  private readonly axiosService: AxiosService;

  constructor(
    private configService: ConfigService,
    private chatGptEntity: ChatgptEntity,
  ) {
    this.axiosService = new AxiosService(configService, 'chatGpt');
  }

  async getFeedBack(messageJson: UserCommandMessageDto[]) {
    let finalPayload: ChatGptPayloadDto = {
      model: this.configService.get('GPT_MODEL'),
      messages: [systemCommandMessage],
      temperature: 0,
    };

    messageJson.forEach((item) => {
      finalPayload.messages.push({
        role: 'user',
        content: JSON.stringify(item),
      });
    });

    const gptResponse = await this.axiosService.post(
      '/completions',
      finalPayload,
    );
    return gptResponse;
  }

  async generateQuestions({
    category_id,
    difficulty,
    sub_category_id,
    tech,
  }: GenerateQuestionDto) {
    let finalPayload: ChatGptPayloadDto = {
      model: this.configService.get('GPT_MODEL'),
      messages: generateQuestionCommand({
        category_id,
        difficulty,
        sub_category_id,
        tech,
      }),
      temperature: 0,
    };

    const gptResponse: ChatGptResponseDto = await this.axiosService.post(
      '/completions',
      finalPayload,
    );

    await this.chatGptEntity.update({
      modelName: gptResponse.model,
      incomingTokens: gptResponse.usage.prompt_tokens,
      outgoingTokens: gptResponse.usage.completion_tokens,
      total: gptResponse.usage.total_tokens,
    });

    const questions: GenerateQuestionResponseDto[] = JSON.parse(
      gptResponse.choices[0].message.content,
    );

    return questions;
  }
}
