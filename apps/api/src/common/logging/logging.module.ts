import { Global, Module } from '@nestjs/common';
import { AppLoggerService } from './app-logger.service.js';
import { AuditLogService } from './audit-log.service.js';

@Global()
@Module({
  providers: [AppLoggerService, AuditLogService],
  exports: [AppLoggerService, AuditLogService],
})
export class LoggingModule {}