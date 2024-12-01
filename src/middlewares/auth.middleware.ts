import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['accessToken']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('AccessToken not found');
    }

    try {
      const decoded = this.jwtService.verify(token); // Verify the JWT
      req.user = decoded; // Store the decoded token payload in the request object
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
