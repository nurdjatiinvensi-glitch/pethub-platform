
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { AppLoggerService } from '../../common/logging/app-logger.service.js';
import { AuditLogService } from '../../common/logging/audit-log.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';

import { CreateCategoryDto } from './dto/create-category.dto.js';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly appLogger: AppLoggerService,
    private readonly auditLog: AuditLogService,
  ) {}

  // GET: Daftar Category
  async findAll(includeInactive = false) {
    const categories =
      await this.prisma.client.orm.public.Category.all();

    return includeInactive
      ? categories
      : categories.filter((category) => category.isActive);
  }

  // GET: Detail Category
  async findOne(id: string) {
    const category =
      await this.prisma.client.orm.public.Category.first({ id });

    if (!category) {
      throw new NotFoundException('Category tidak ditemukan');
    }

    return category;
  }

  // POST: Create Category
  async create(data: CreateCategoryDto) {
    if (!data.name?.trim()) {
      throw new BadRequestException('Nama Category wajib diisi');
    }

    const name = data.name.trim();

    const existingCategory =
      await this.prisma.client.orm.public.Category.first({ name });

    if (existingCategory) {
      throw new ConflictException('Nama Category sudah digunakan');
    }

    const category =
      await this.prisma.client.orm.public.Category.create({
        name,
        description: data.description?.trim() || null,
      });

    this.appLogger.info('CategoryService', 'CATEGORY_CREATED', {
      categoryId: category.id,
      categoryName: category.name,
    });

    await this.auditLog.log({
      action: 'CATEGORY_CREATED',
      entity: 'Category',
      entityId: category.id,
      newValue: category,
    });

    return category;
  }

  // PUT: Update Category
  async update(id: string, data: Partial<CreateCategoryDto>) {
    const currentCategory = await this.findOne(id);

    if (data.name !== undefined && !data.name.trim()) {
      throw new BadRequestException('Nama Category wajib diisi');
    }

    if (data.name !== undefined) {
      const existingCategory =
        await this.prisma.client.orm.public.Category.first({
          name: data.name.trim(),
        });

      if (existingCategory && existingCategory.id !== id) {
        throw new ConflictException('Nama Category sudah digunakan');
      }
    }

    const updatedCategory =
      await this.prisma.client.orm.public.Category
        .where({ id })
        .update({
          ...(data.name !== undefined && {
            name: data.name.trim(),
          }),
          ...(data.description !== undefined && {
            description: data.description?.trim() || null,
          }),
        });

    if (!updatedCategory) {
      throw new NotFoundException('Category tidak ditemukan');
    }

    const updatedData = await this.findOne(id);

    this.appLogger.info('CategoryService', 'CATEGORY_UPDATED', {
      categoryId: id,
      categoryName: updatedData.name,
    });

    await this.auditLog.log({
      action: 'CATEGORY_UPDATED',
      entity: 'Category',
      entityId: id,
      oldValue: currentCategory,
      newValue: updatedData,
    });

    return updatedData;
  }

  // PATCH: Activate / Deactivate Category
  async updateStatus(id: string, isActive: boolean) {
    const currentCategory = await this.findOne(id);

    const updatedCategory =
      await this.prisma.client.orm.public.Category
        .where({ id })
        .update({ isActive });

    if (!updatedCategory) {
      throw new NotFoundException('Category tidak ditemukan');
    }

    const updatedData = await this.findOne(id);

    this.appLogger.info('CategoryService', 'CATEGORY_STATUS_CHANGED', {
      categoryId: id,
      categoryName: updatedData.name,
      isActive,
    });

    await this.auditLog.log({
      action: 'CATEGORY_STATUS_CHANGED',
      entity: 'Category',
      entityId: id,
      oldValue: {
        isActive: currentCategory.isActive,
      },
      newValue: {
        isActive: updatedData.isActive,
      },
    });

    return updatedData;
  }
}
