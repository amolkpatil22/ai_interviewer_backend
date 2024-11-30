import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

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

      const response = await this.userEntity.create({
        ...createUserDto,
        password: hashedPassword,
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'User Created Successfully',
        data: response.toObject(),
      };
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
