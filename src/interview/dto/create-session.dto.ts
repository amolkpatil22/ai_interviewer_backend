import { IsMongoId, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  @IsMongoId()
  category_id: string;

  @IsString()
  @IsMongoId()
  sub_category_id: string;
}
