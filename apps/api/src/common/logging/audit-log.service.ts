
import { Injectable } from '@nestjs/common';
import type { DbContext } from '../../prisma/db-context.js';
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

  // `db` opsional: isi dengan tx agar audit log tersimpan dalam transaksi yang sama.
  async log(data: CreateAuditLog, db: DbContext = this.prisma.client) {
    return db.orm.public.AuditLog.create({
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
