import { GenerateQuestionResponseDto } from './generate-question-response.dto';

export class ChatCompletionChoiceDto {
  index: number;
  message: Message;
  logprobs: any;
  finish_reason: string;
}

export class UsageDetailsDto {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  prompt_tokens_details: PromptTokenDetails;
  completion_tokens_details: CompletionTOkenDetails;
}

export class PromptTokenDetails {
  cached_tokens: number;
  audio_tokens: number;
}

export class CompletionTOkenDetails {
  audio_tokens: number;
  accepted_prediction_tokens: number;
  rejected_prediction_tokens: number;
  reasoning_tokens: number; // Optional since not present in all cases
}

export class ChatGptResponseDto {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: ChatCompletionChoiceDto[];
  usage: UsageDetailsDto;
  system_fingerprint: string;
}

export class Message {
  role: string;
  content: string;
}
