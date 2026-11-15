import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { AuditLogService } from '../../common/logging/audit-log.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';

import type { CreateSubcategoryDto } from './dto/create-subcategory.dto.js';
import type { UpdateSubcategoryStatusDto } from './dto/update-subcategory-status.dto.js';
import type { UpdateSubcategoryDto } from './dto/update-subcategory.dto.js';

@Injectable()
export class SubcategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLog: AuditLogService,
  ) {}

  async findAll(
    categoryId?: string,
    includeInactive = false,
  ) {
    const subcategories =
      await this.prisma.client.orm.public.Subcategory.all();

    return subcategories.filter(
      (subcategory) =>
        (includeInactive || subcategory.isActive) &&
        (!categoryId || subcategory.categoryId === categoryId),
    );
  }

  async findOne(id: string) {
    const subcategory =
      await this.prisma.client.orm.public.Subcategory.first({ id });

    if (!subcategory) {
      throw new NotFoundException('Subcategory tidak ditemukan.');
    }

    return subcategory;
  }

  async create(dto: CreateSubcategoryDto) {
    const name = dto.name?.trim();

    if (!name) {
      throw new BadRequestException(
        'Nama Subcategory wajib diisi.',
      );
    }

    if (!dto.categoryId?.trim()) {
      throw new BadRequestException(
        'Category wajib dipilih.',
      );
    }

    const category =
      await this.prisma.client.orm.public.Category.first({
        id: dto.categoryId,
      });

    if (!category || !category.isActive) {
      throw new BadRequestException(
        'Category tidak ditemukan atau tidak aktif.',
      );
    }

    const duplicate =
      await this.prisma.client.orm.public.Subcategory.first({
        name,
        categoryId: dto.categoryId,
      });

    if (duplicate) {
      throw new ConflictException(
        'Subcategory dengan nama tersebut sudah ada di Category ini.',
      );
    }

    const subcategory =
      await this.prisma.client.orm.public.Subcategory.create({
        name,
        description: dto.description?.trim() || null,
        categoryId: dto.categoryId,
      });

    await this.auditLog.log({
      action: 'SUBCATEGORY_CREATED',
      entity: 'Subcategory',
      entityId: subcategory.id,
      newValue: subcategory,
    });

    return subcategory;
  }

  async update(id: string, dto: UpdateSubcategoryDto) {
    const existing = await this.findOne(id);
    const name = dto.name?.trim();

    if (!name) {
      throw new BadRequestException(
        'Nama Subcategory wajib diisi.',
      );
    }

    const duplicate =
      await this.prisma.client.orm.public.Subcategory.first({
        name,
        categoryId: existing.categoryId,
      });

    if (duplicate && duplicate.id !== id) {
      throw new ConflictException(
        'Subcategory dengan nama tersebut sudah ada di Category ini.',
      );
    }

    const updated =
      await this.prisma.client.orm.public.Subcategory
        .where({ id })
        .update({
          name,
          description: dto.description?.trim() || null,
        });

    await this.auditLog.log({
      action: 'SUBCATEGORY_UPDATED',
      entity: 'Subcategory',
      entityId: id,
      oldValue: existing,
      newValue: updated,
    });

    return updated;
  }

  async updateStatus(
    id: string,
    dto: UpdateSubcategoryStatusDto,
  ) {
    const existing = await this.findOne(id);

    if (typeof dto.isActive !== 'boolean') {
      throw new BadRequestException(
        'Status isActive harus berupa boolean.',
      );
    }

    if (existing.isActive === dto.isActive) {
      return existing;
    }

    const updated =
      await this.prisma.client.orm.public.Subcategory
        .where({ id })
        .update({
          isActive: dto.isActive,
        });

    await this.auditLog.log({
      action: 'SUBCATEGORY_STATUS_CHANGED',
      entity: 'Subcategory',
      entityId: id,
      oldValue: { isActive: existing.isActive },
      newValue: { isActive: dto.isActive },
    });

    return updated;
  }
}