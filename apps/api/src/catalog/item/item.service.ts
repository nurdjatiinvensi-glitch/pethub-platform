
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { AppLoggerService } from '../../common/logging/app-logger.service.js';
import { AuditLogService } from '../../common/logging/audit-log.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateItemDto } from './dto/create-item.dto.js';

@Injectable()
export class ItemService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly appLogger: AppLoggerService,
    private readonly auditLog: AuditLogService,
  ) {}

  // GET: Daftar Item
  async findAll() {
    const items = await this.prisma.client.orm.public.Item.all();
    const specifications =
      await this.prisma.client.orm.public.ItemSpecification.all();

    return items.map((item) => ({
      ...item,
      specifications: specifications.filter(
        (specification) => specification.itemId === item.id,
      ),
    }));
  }

  // GET: Detail Item
  async findOne(id: string) {
    const item = await this.prisma.client.orm.public.Item.first({ id });

    if (!item) {
      throw new NotFoundException('Item tidak ditemukan');
    }

    const specifications =
      await this.prisma.client.orm.public.ItemSpecification.all();

    return {
      ...item,
      specifications: specifications.filter(
        (specification) => specification.itemId === item.id,
      ),
    };
  }

  // POST: Create Item
  async create(data: CreateItemDto) {
    if (
      !data.itemCode?.trim() ||
      !data.name?.trim() ||
      !data.categoryId ||
      !data.subcategoryId
    ) {
      throw new BadRequestException(
        'Item Code, Name, Category, dan Subcategory wajib diisi',
      );
    }

    if (
      typeof data.price !== 'number' ||
      !Number.isFinite(data.price) ||
      data.price < 0
    ) {
      throw new BadRequestException(
        'Price harus berupa angka nol atau lebih',
      );
    }

    const specificationsInput = data.specifications ?? [];

    this.validateSpecifications(specificationsInput);

    const existingItem =
      await this.prisma.client.orm.public.Item.first({
        itemCode: data.itemCode.trim(),
      });

    if (existingItem) {
      throw new ConflictException('Item Code sudah digunakan');
    }

    await this.validateCategory(
      data.categoryId,
      data.subcategoryId,
    );

    const item = await this.prisma.client.orm.public.Item.create({
      itemCode: data.itemCode.trim(),
      name: data.name.trim(),
      itemType: data.itemType ?? 'PRODUCT',
      description: data.description?.trim() ?? null,
      price: data.price,
      imageUrl: data.imageUrl ?? null,
      categoryId: data.categoryId,
      subcategoryId: data.subcategoryId,
      ownerType: data.ownerType ?? 'PETHUB',
      ownerId: data.ownerId ?? null,
    });

    const specifications = [];

    for (const specification of specificationsInput) {
      const created =
        await this.prisma.client.orm.public.ItemSpecification.create({
          itemId: item.id,
          name: specification.name.trim(),
          value: specification.value.trim(),
        });

      specifications.push(created);
    }

    this.appLogger.info('ItemService', 'ITEM_CREATED', {
      itemId: item.id,
      itemCode: item.itemCode,
      itemName: item.name,
    });

    await this.auditLog.log({
      action: 'ITEM_CREATED',
      entity: 'Item',
      entityId: item.id,
      newValue: {
        ...item,
        specifications,
      },
    });

    return {
      ...item,
      specifications,
    };
  }

  // PUT: Update Item
  async update(id: string, data: Partial<CreateItemDto>) {
    const currentItem = await this.findOne(id);

    if (data.itemCode !== undefined && !data.itemCode.trim()) {
      throw new BadRequestException('Item Code wajib diisi');
    }

    if (data.name !== undefined && !data.name.trim()) {
      throw new BadRequestException('Nama Item wajib diisi');
    }

    if (
      data.price !== undefined &&
      (
        typeof data.price !== 'number' ||
        !Number.isFinite(data.price) ||
        data.price < 0
      )
    ) {
      throw new BadRequestException(
        'Price harus berupa angka nol atau lebih',
      );
    }

    // Periksa duplikasi Item Code
    if (data.itemCode !== undefined) {
      const existingItem =
        await this.prisma.client.orm.public.Item.first({
          itemCode: data.itemCode.trim(),
        });

      if (existingItem && existingItem.id !== id) {
        throw new ConflictException('Item Code sudah digunakan');
      }
    }

    // Validasi Category dan Subcategory
    const categoryId = data.categoryId ?? currentItem.categoryId;
    const subcategoryId =
      data.subcategoryId ?? currentItem.subcategoryId;

    await this.validateCategory(categoryId, subcategoryId);

    // Validasi specifications
    if (data.specifications !== undefined) {
      this.validateSpecifications(data.specifications);
    }

    const updatedItem =
      await this.prisma.client.orm.public.Item
        .where({ id })
        .update({
          ...(data.itemCode !== undefined && {
            itemCode: data.itemCode.trim(),
          }),
          ...(data.name !== undefined && {
            name: data.name.trim(),
          }),
          ...(data.itemType !== undefined && {
            itemType: data.itemType,
          }),
          ...(data.description !== undefined && {
            description: data.description?.trim() || null,
          }),
          ...(data.price !== undefined && {
            price: data.price,
          }),
          ...(data.imageUrl !== undefined && {
            imageUrl: data.imageUrl,
          }),
          ...(data.categoryId !== undefined && {
            categoryId: data.categoryId,
          }),
          ...(data.subcategoryId !== undefined && {
            subcategoryId: data.subcategoryId,
          }),
          ...(data.ownerType !== undefined && {
            ownerType: data.ownerType,
          }),
          ...(data.ownerId !== undefined && {
            ownerId: data.ownerId,
          }),
        });

    if (!updatedItem) {
      throw new NotFoundException('Item tidak ditemukan');
    }

    // Ganti specifications jika field dikirim
    if (data.specifications !== undefined) {
      await this.prisma.client.orm.public.ItemSpecification
        .where({ itemId: id })
        .deleteAll();

      for (const specification of data.specifications) {
        await this.prisma.client.orm.public.ItemSpecification.create({
          itemId: id,
          name: specification.name.trim(),
          value: specification.value.trim(),
        });
      }
    }

    const updatedData = await this.findOne(id);

    this.appLogger.info('ItemService', 'ITEM_UPDATED', {
      itemId: id,
      itemCode: updatedData.itemCode,
    });

    await this.auditLog.log({
      action: 'ITEM_UPDATED',
      entity: 'Item',
      entityId: id,
      oldValue: currentItem,
      newValue: updatedData,
    });

    return updatedData;
  }

  // PATCH: Aktif / Nonaktif Item
  async updateStatus(id: string, isActive: boolean) {
    const currentItem = await this.findOne(id);

    const updatedItem =
      await this.prisma.client.orm.public.Item
        .where({ id })
        .update({ isActive });

    if (!updatedItem) {
      throw new NotFoundException('Item tidak ditemukan');
    }

    const updatedData = await this.findOne(id);

    this.appLogger.info('ItemService', 'ITEM_STATUS_CHANGED', {
      itemId: id,
      itemCode: updatedData.itemCode,
      isActive,
    });

    await this.auditLog.log({
      action: 'ITEM_STATUS_CHANGED',
      entity: 'Item',
      entityId: id,
      oldValue: {
        isActive: currentItem.isActive,
      },
      newValue: {
        isActive: updatedData.isActive,
      },
    });

    return updatedData;
  }

  // DELETE: Hapus Item dan Specifications
  async remove(id: string) {
    const currentItem = await this.findOne(id);

    await this.prisma.client.orm.public.ItemSpecification
      .where({ itemId: id })
      .deleteAll();

    const deletedItem =
      await this.prisma.client.orm.public.Item
        .where({ id })
        .delete();

    if (!deletedItem) {
      throw new NotFoundException('Item gagal dihapus');
    }

    this.appLogger.info('ItemService', 'ITEM_DELETED', {
      itemId: deletedItem.id,
      itemCode: deletedItem.itemCode,
    });

    await this.auditLog.log({
      action: 'ITEM_DELETED',
      entity: 'Item',
      entityId: id,
      oldValue: currentItem,
    });

    return {
      message: 'Item berhasil dihapus',
      id: deletedItem.id,
      itemCode: deletedItem.itemCode,
    };
  }

  // Helper: Validasi Category dan Subcategory
  private async validateCategory(
    categoryId: string,
    subcategoryId: string,
  ) {
    const category =
      await this.prisma.client.orm.public.Category.first({
        id: categoryId,
      });

    if (!category || !category.isActive) {
      throw new BadRequestException(
        'Category tidak valid atau tidak aktif',
      );
    }

    const subcategory =
      await this.prisma.client.orm.public.Subcategory.first({
        id: subcategoryId,
      });

    if (
      !subcategory ||
      !subcategory.isActive ||
      subcategory.categoryId !== categoryId
    ) {
      throw new BadRequestException(
        'Subcategory tidak valid untuk Category yang dipilih',
      );
    }
  }

  // Helper: Validasi Dynamic Specifications
  private validateSpecifications(
    specifications: CreateItemDto['specifications'],
  ) {
    for (const specification of specifications ?? []) {
      if (
        !specification.name?.trim() ||
        !specification.value?.trim()
      ) {
        throw new BadRequestException(
          'Nama dan nilai specification wajib diisi',
        );
      }
    }
  }
}
