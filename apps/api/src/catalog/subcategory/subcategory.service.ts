import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class SubcategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(categoryId?: string) {
    const subcategories =
      await this.prisma.client.orm.public.Subcategory.all();

    return subcategories.filter(
      (subcategory) =>
        subcategory.isActive &&
        (!categoryId || subcategory.categoryId === categoryId),
    );
  }
}