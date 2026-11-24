
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { randomBytes } from 'node:crypto';

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

  async findFeedCareItems() {
    const items = await this.prisma.client.orm.public.Item.all();
    return items.filter(
      (item) => item.isActive && item.isFeedCareEligible && item.itemType === 'PRODUCT',
    );
  }

  async findFeedCareItemById(id: string) {
    const item = await this.prisma.client.orm.public.Item.first({ id });
    if (
      !item ||
      !item.isActive ||
      !item.isFeedCareEligible ||
      item.itemType !== 'PRODUCT'
    ) {
      throw new NotFoundException('Item FeedCare tidak ditemukan atau tidak tersedia.');
    }
    return item;
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
      !data.name?.trim() ||
      !data.categoryId ||
      !data.subcategoryId
    ) {
      throw new BadRequestException(
        'Name, Category, dan Subcategory wajib diisi',
      );
    }

    // Validasi Decimal Price
    this.validatePrice(data.price);

    this.validateFeedCareFlag(data.isFeedCareEligible);
    const ownerType = data.ownerType ?? 'PETHUB';
    this.validateOwnership(ownerType, data.ownerId);

    if (data.isFeedCareEligible && (data.itemType ?? 'PRODUCT') !== 'PRODUCT') {
      throw new BadRequestException('Hanya Item bertipe Product yang dapat ditampilkan di FeedCare');
    }

    const specificationsInput = data.specifications ?? [];

    this.validateSpecifications(specificationsInput);

    await this.validateCategory(
      data.categoryId,
      data.subcategoryId,
    );

    // Item Code dibuat otomatis oleh backend
    const itemCode = await this.generateItemCode();

    const item = await this.prisma.client.orm.public.Item.create({
      itemCode,
      name: data.name.trim(),
      itemType: data.itemType ?? 'PRODUCT',
      description: data.description?.trim() ?? null,
      price: data.price,
      imageUrl: data.imageUrl ?? null,
      categoryId: data.categoryId,
      subcategoryId: data.subcategoryId,
      ownerType,
      ownerId: ownerType === 'MERCHANT' ? data.ownerId!.trim() : null,
      isFeedCareEligible: data.isFeedCareEligible ?? false,
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

    // Item Code bersifat immutable
    if (
      data.itemCode !== undefined &&
      data.itemCode !== currentItem.itemCode
    ) {
      throw new BadRequestException(
        'Item Code tidak dapat diubah',
      );
    }

    if (data.name !== undefined && !data.name.trim()) {
      throw new BadRequestException('Nama Item wajib diisi');
    }

    this.validateFeedCareFlag(data.isFeedCareEligible);

    const resultingFeedCareEligibility =
      data.isFeedCareEligible ?? currentItem.isFeedCareEligible;
    const resultingOwnerType = data.ownerType ?? currentItem.ownerType;
    const resultingOwnerId = data.ownerId ?? currentItem.ownerId ?? undefined;
    this.validateOwnership(resultingOwnerType, resultingOwnerId);
    const resultingItemType = data.itemType ?? currentItem.itemType;
    if (resultingFeedCareEligibility && resultingItemType !== 'PRODUCT') {
      throw new BadRequestException('Hanya Item bertipe Product yang dapat ditampilkan di FeedCare');
    }

    // Validasi Decimal Price
    if (data.price !== undefined) {
      this.validatePrice(data.price);
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
          ...((data.ownerType !== undefined || data.ownerId !== undefined) && {
            ownerId: resultingOwnerType === 'MERCHANT' ? resultingOwnerId!.trim() : null,
          }),
          ...(data.isFeedCareEligible !== undefined && {
            isFeedCareEligible: data.isFeedCareEligible,
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

  // Helper: Generate Item Code Otomatis
  private async generateItemCode(): Promise<string> {
    const date = new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, '');

    for (let attempt = 0; attempt < 5; attempt++) {
      const randomCode = randomBytes(3)
        .toString('hex')
        .toUpperCase();

      const itemCode = `ITM-${date}-${randomCode}`;

      const existingItem =
        await this.prisma.client.orm.public.Item.first({
          itemCode,
        });

      if (!existingItem) {
        return itemCode;
      }
    }

    throw new ConflictException(
      'Gagal membuat Item Code. Silakan coba kembali.',
    );
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

  // Helper: Validasi Decimal Price (maksimal 5 angka desimal)
  private validatePrice(price: string) {
    if (
      typeof price !== 'string' ||
      !/^\d+(?:\.\d{1,5})?$/.test(price)
    ) {
      throw new BadRequestException(
        'Price harus berupa angka nol atau lebih dengan maksimal 5 angka desimal',
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

  private validateFeedCareFlag(value: boolean | undefined) {
    if (value !== undefined && typeof value !== 'boolean') {
      throw new BadRequestException('isFeedCareEligible harus berupa true atau false');
    }
  }

  private validateOwnership(ownerType: string, ownerId: string | undefined) {
    if (ownerType !== 'PETHUB' && ownerType !== 'MERCHANT') {
      throw new BadRequestException('Owner Type harus PETHUB atau MERCHANT');
    }
    if (ownerType === 'MERCHANT' && !ownerId?.trim()) {
      throw new BadRequestException('ID akun toko (Owner ID) wajib diisi untuk item Toko');
    }
  }
}
