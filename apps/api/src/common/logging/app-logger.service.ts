
import { Injectable, Logger } from '@nestjs/common';

export interface LogMetadata {
  [key: string]: unknown;
}

@Injectable()
export class AppLoggerService {
  private readonly logger = new Logger('PetHub');

  private formatLog(
    level: string,
    context: string,
    event: string,
    metadata?: LogMetadata,
  ) {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      application: 'PetHub API',
      context,
      event,
      ...(metadata && { metadata }),
    });
  }

  info(context: string, event: string, metadata?: LogMetadata) {
    this.logger.log(
      this.formatLog('INFO', context, event, metadata),
    );
  }

  warn(context: string, event: string, metadata?: LogMetadata) {
    this.logger.warn(
      this.formatLog('WARN', context, event, metadata),
    );
  }

  error(
    context: string,
    event: string,
    error?: unknown,
    metadata?: LogMetadata,
  ) {
    const errorDetails =
      error instanceof Error
        ? {
            message: error.message,
            stack: error.stack,
          }
        : error !== undefined
          ? { message: String(error) }
          : undefined;

    this.logger.error(
      this.formatLog('ERROR', context, event, {
        ...metadata,
        ...(errorDetails && { error: errorDetails }),
      }),
    );
  }
}
