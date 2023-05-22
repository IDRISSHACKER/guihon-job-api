import {
  Injectable,
  NestMiddleware,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PRIVATE_KEY } from '../utils/Const';
import jwt = require('jsonwebtoken');

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("request!")
      //const token = req.header('authorization').split(' ')[1];

      //const verification = jwt.verify(token, PRIVATE_KEY);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Authentication required to access of these ressouces',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    next();
  }
}
