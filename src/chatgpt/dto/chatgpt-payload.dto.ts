export class ChatGptPayloadDto {
  model: string;
  messages: GptCommandMessage[];
  temperature: number;
}

export interface GptCommandMessage {
  role: 'developer' | 'user';
  content: string;
}
