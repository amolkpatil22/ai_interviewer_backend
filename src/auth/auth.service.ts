import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AccessTokenDataDto } from 'src/common/interfaces/accessToken.dto';

@Injectable()
export class AuthService {
  constructor(
    private userEntity: UserEntity,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto, res: Response) {
    const user = await this.userEntity.findByEmail(loginUserDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    } else {
      const isPasswordValid = bcrypt.compareSync(
        loginUserDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password');
      }
      let tokenPayload: AccessTokenDataDto = {
        name: user.name,
        email: user.email,
        user_id: user._id.toString(),
      };
      const accessToken = this.jwtService.sign(tokenPayload);

      res.cookie('accessToken', `Bearer ${accessToken}`, {
        httpOnly: true,
        // secure: true,
        sameSite:"none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      });

      res.send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
