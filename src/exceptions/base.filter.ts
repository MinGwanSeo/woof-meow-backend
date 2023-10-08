import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { PinoLoggerService as Logger } from '../pino-logger/pino-logger.service';
/**
 * Base exception filter
 * @description This filter is used to catch all exceptions and return a generic response
 */
@Catch()
export class BaseExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) { }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = exception.getStatus() || 500;

    const errorResponse = exception.getResponse();
    let errorMessage: string;

    if (typeof errorResponse === 'string') {
      errorMessage = errorResponse;
    } else if (typeof errorResponse === 'object' && errorResponse !== null) {
      errorMessage = JSON.stringify(errorResponse);  // 객체를 문자열로 변환
    } else {
      errorMessage = 'Unknown error';
    }
    const sourceClass = (exception as any).sourceClass || this.constructor.name;
    this.logger.setContext(sourceClass);
    this.logger.error(`Exception thrown: ${errorMessage}`, exception.stack?.toString() || '');

    response.status(status).send({
      statusCode: status,
      error: errorMessage,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
}
