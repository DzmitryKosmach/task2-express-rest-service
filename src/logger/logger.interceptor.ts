import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Logger } from 'winston';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { FastifyRequest } from 'fastify';
//import { PATH_METADATA } from '@nestjs/common/constants';

function isExpressRequest(
  request: Request | FastifyRequest,
): request is Request {
  return (request as FastifyRequest).req === undefined;
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request | FastifyRequest = context
      .switchToHttp()
      .getRequest();

    //const response: Response | FastifyReply = context
    const response: Response = context.switchToHttp().getResponse();

    //response.on('finish', () => {
    const url = isExpressRequest(request)
      ? request.url
      : (request as FastifyRequest).raw.url;

    const query = isExpressRequest(request)
      ? request.query
      : (request as FastifyRequest).query;

    const params = isExpressRequest(request)
      ? request.params
      : (request as FastifyRequest).params;

    const body = isExpressRequest(request)
      ? request.body
      : (request as FastifyRequest).body;

    const message = `url: ${url}; queryParams: ${JSON.stringify(
      query,
    )}; pathParams: ${JSON.stringify(params)}; body: ${JSON.stringify(
      body,
    )}; statusCode: ${response.statusCode}`;

    this.logger.info(`${message}`);
    if (response.statusCode > 399) {
      this.logger.error(`Level: ERROR: ${message}`);
    }
    //});

    return next.handle();
  }
}
