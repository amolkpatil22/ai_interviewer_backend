import { Injectable } from '@nestjs/common';
import { AxiosService } from 'src/axios_interceptor/axios_interceptor.service';
import { ChatGptPayloadDto } from './dto/chatgpt-payload.dto';
import { ConfigService } from '@nestjs/config';
import { getCandidateAnswerFeedbackMessage } from 'src/common/command_prompt/get_cadidate_answer_feedback';
import { generateQuestionCommand } from 'src/common/command_prompt/generate_questions';
import { GenerateQuestionDto } from './dto/generate-question.dto';
import { ChatGptResponseDto } from './dto/chatgpt-response.dto';
import { ChatgptEntity } from './entities/chatgpt.entity';
import { GenerateQuestionResponseDto } from './dto/generate-question-response.dto';
import { RawDataEntity } from './entities/raw-data.entity';
import { AnswerFeedbackDto } from './dto/answer_feedback.dto';
import { GetAnswerFeedbackDto } from './dto/get_answer_feedback.dto';

@Injectable()
export class ChatgptService {
  private readonly axiosService: AxiosService;

  constructor(
    private configService: ConfigService,
    private chatGptEntity: ChatgptEntity,
    private rawDataEntity: RawDataEntity,
  ) {
    this.axiosService = new AxiosService(configService, 'chatGpt');
  }

  async getCandidateAnswerFeedBack({
    question,
    candidate_answer,
    tech_stack,
  }: GetAnswerFeedbackDto): Promise<AnswerFeedbackDto> {
    try {
      const finalPayload: ChatGptPayloadDto = {
        model: this.configService.get('GPT_MODEL'),
        messages: getCandidateAnswerFeedbackMessage({
          question,
          candidate_answer,
          tech_stack,
        }),
        temperature: 0,
      };

      const gptResponse: ChatGptResponseDto = await this.axiosService.post(
        '/completions',
        finalPayload,
      );

      this.updateTokenDatabase(gptResponse);

      const feedback: AnswerFeedbackDto = JSON.parse(
        gptResponse.choices[0].message.content,
      );

      return feedback;
    } catch (error: unknown) {
      throw error;
    }
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
      temperature: 0.5,
    };

    const gptResponse: ChatGptResponseDto = await this.axiosService.post(
      '/completions',
      finalPayload,
    );

    this.updateTokenDatabase(gptResponse);

    const questions: GenerateQuestionResponseDto[] = JSON.parse(
      gptResponse.choices[0].message.content,
    );

    return questions;
  }

  updateTokenDatabase(gptResponse: ChatGptResponseDto) {
    this.rawDataEntity.saveObject(gptResponse);
    this.chatGptEntity.update({
      modelName: gptResponse.model,
      incomingTokens: gptResponse.usage.prompt_tokens,
      outgoingTokens: gptResponse.usage.completion_tokens,
      total: gptResponse.usage.total_tokens,
    });
  }
}
