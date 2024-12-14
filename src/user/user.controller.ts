import { Controller, Post, Body, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request as req } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  create(@Body() createUserDto: CreateUserDto, @Request() req: req) {
    return this.userService.create({ ...createUserDto, ip: req.ip });
  }
}
