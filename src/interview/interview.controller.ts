import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { InterviewService } from './interview.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { AccessTokenDataDto } from 'src/common/types/accessToken.dto';
import { Request as mongoReq } from 'express';

@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Post('create-session')
  create(@Body() createSessionDto: CreateSessionDto, @Request() req: mongoReq) {
    return this.interviewService.create(createSessionDto, req.user);
  }

  @Get()
  findAll() {
    return this.interviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interviewService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInterviewDto: UpdateInterviewDto,
  ) {
    return this.interviewService.update(+id, updateInterviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interviewService.remove(+id);
  }
}
