import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Request,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { InterviewService } from './interview.service';
import { CreateSessionDto } from './dto/create_session.dto';
import { Request as mongoReq } from 'express';
import { Types } from 'mongoose';
import { SubmitAnswerDto } from './dto/submit_answer.dto';

@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Get('get-all-categories')
  getTechStackList() {
    return this.interviewService.getAllCategories();
  }

  @Get('get-sub-categories-by-category-id/:category_id')
  getSubCategoryByCategoryId(@Param('category_id') category_id: string) {
    if (!Types.ObjectId.isValid(category_id)) {
      throw new BadRequestException('Invalid category_id format');
    }
    return this.interviewService.getSubCategoryByCategoryId(category_id);
  }

  @Post('create-session')
  create(@Body() createSessionDto: CreateSessionDto, @Request() req: mongoReq) {
    return this.interviewService.create(createSessionDto, req.user);
  }

  @Patch('end-session/:session_id')
  endSession(@Param('session_id') session_id: string) {
    if (!Types.ObjectId.isValid(session_id)) {
      throw new BadRequestException('Invalid session_id');
    }
    return this.interviewService.endSession(session_id);
  }

  @Post('submit-answer/:session_id')
  submitAnswer(
    @Param('session_id') session_id: string,
    @Body() submitAnswerDto: SubmitAnswerDto,
    @Request() req: mongoReq,
  ) {
    if (!Types.ObjectId.isValid(session_id)) {
      throw new BadRequestException('Invalid session_id');
    }
    if (!Types.ObjectId.isValid(submitAnswerDto.question_id)) {
      throw new BadRequestException('Invalid question_id');
    }
    return this.interviewService.submitAnswer(
      session_id,
      submitAnswerDto,
      req.user,
    );
  }

  @Get('generate-report/:session_id')
  generateReport(@Param('session_id') session_id: string) {
    if (!Types.ObjectId.isValid(session_id)) {
      throw new BadRequestException('Invalid session_id');
    }
    return this.interviewService.generateReport(new Types.ObjectId(session_id));
  }
}
