import { IsDate, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  @IsMongoId()
  category_id: string;

  @IsString()
  @IsMongoId()
  sub_category_id: string;

  @IsOptional()
  @IsDate()
  start_at: Date;

  @IsOptional()
  @IsDate()
  end_at: Date;
}
