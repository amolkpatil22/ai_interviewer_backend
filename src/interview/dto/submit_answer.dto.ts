import { IsString } from 'class-validator';

export class SubmitAnswerDto {
  @IsString()
  question_id: string;

  @IsString()
  candidate_answer: string;
}
