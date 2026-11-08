
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

export interface CreateAuditLog {
  actorId?: string | null;
  action: string;
  entity: string;
  entityId: string;
  oldValue?: unknown;
  newValue?: unknown;
}

@Injectable()
export class AuditLogService {
  constructor(private readonly prisma: PrismaService) {}

  async log(data: CreateAuditLog) {
    return this.prisma.client.orm.public.AuditLog.create({
      actorId: data.actorId ?? null,
      action: data.action,
      entity: data.entity,
      entityId: data.entityId,
      oldValue:
        data.oldValue !== undefined
          ? JSON.stringify(data.oldValue)
          : null,
      newValue:
        data.newValue !== undefined
          ? JSON.stringify(data.newValue)
          : null,
    });
  }
}
