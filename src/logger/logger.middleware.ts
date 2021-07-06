import {
  Inject,
  Injectable,
  LoggerService,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from 'winston';

// Проверить implements LoggerService и  extends Logger from '@nestjs/common'
@Injectable()
export class LoggerMiddleware implements NestMiddleware, LoggerService {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  log(message: any, context?: string) {
    throw new Error('Method not implemented.');
  }
  error(message: any, trace?: string, context?: string) {
    throw new Error('Method not implemented.');
  }
  warn(message: any, context?: string) {
    throw new Error('Method not implemented.');
  }
  debug?(message: any, context?: string) {
    throw new Error('Method not implemented.');
  }
  verbose?(message: any, context?: string) {
    throw new Error('Method not implemented.');
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.info(
      `url: ${JSON.stringify(req.baseUrl)} queryParams: ${JSON.stringify(
        req.query,
      )} pathParams: ${JSON.stringify(req.params)} body: ${JSON.stringify(
        req.body,
      )} statusCode: ${res.statusCode}`,
    );
    if (Number(res.status) > 399) {
      this.logger.error(`Error ${res.status}`);
    }
    next();
  }
}
