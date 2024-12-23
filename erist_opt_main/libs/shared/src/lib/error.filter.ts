import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const contextType = host.getType();

    if (contextType === 'http') {
      return response.status(status).json({
        statusCode: status,
        message: exception.message,
        path: request.url,
        method: request.method,
        complete: request.complete,
        timestamp: new Date().toISOString(),
      });
    }

    if (status >= 400 && status < 600) {
      return null;
    }

    return response.status(status).json({
      statusCode: status,
      message: exception.message,
      path: request.url,
      method: request.method,
      complete: request.complete,
      timestamp: new Date().toISOString(),
    });
  }
}
