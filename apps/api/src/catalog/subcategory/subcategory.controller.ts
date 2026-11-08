import { Controller, Get, Query } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service.js';

@Controller('catalog/subcategories')
export class SubcategoryController {
  constructor(
    private readonly subcategoryService: SubcategoryService,
  ) {}

  @Get()
  findAll(@Query('categoryId') categoryId?: string) {
    return this.subcategoryService.findAll(categoryId);
  }
}