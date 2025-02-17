import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private userEntity: UserEntity,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // checking if user is already present or not
    const user = await this.userEntity.findByEmail(createUserDto.email);

    if (user) {
      throw new ConflictException('User Already Present With Given Email');
    } else {
      // user is new so will create account but before that need to hash password
      const saltRound = this.configService.get('SALT_ROUND');
      const hashedPassword = bcrypt.hashSync(
        createUserDto.password,
        Number(saltRound),
      );

      await this.userEntity.create({
        ...createUserDto,
        password: hashedPassword,
      });

      return { message: 'User Created' };
    }
  }
}
