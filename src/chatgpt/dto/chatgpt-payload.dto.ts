export class ChatGptPayloadDto {
  model: string;
  message: { role: 'system' | 'user'; content: string }[];
  temperature: number;
}
