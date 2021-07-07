import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from 'winston';

// Проверить implements LoggerService и  extends Logger from '@nestjs/common'
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const message = `url: ${req.baseUrl}; queryParams: ${JSON.stringify(
      req.query,
    )}; pathParams: ${JSON.stringify(req.params)}; body: ${JSON.stringify(
      req.body,
    )}; statusCode: ${res.statusCode}`;

    res.on('finish', () => {
      this.logger.info(`Level: INFO: ${message}`);
      if (res.statusCode > 399) {
        this.logger.error(`Level: ERROR: ${message}`);
      }
    });

    next();
  }
}