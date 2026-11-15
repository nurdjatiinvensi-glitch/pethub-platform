import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { SubcategoryService } from './subcategory.service.js';

import type { CreateSubcategoryDto } from './dto/create-subcategory.dto.js';
import type { UpdateSubcategoryStatusDto } from './dto/update-subcategory-status.dto.js';
import type { UpdateSubcategoryDto } from './dto/update-subcategory.dto.js';

@Controller('catalog/subcategories')
export class SubcategoryController {
  constructor(
    private readonly subcategoryService: SubcategoryService,
  ) {}

  @Get()
  findAll(
    @Query('categoryId') categoryId?: string,
    @Query('includeInactive') includeInactive?: string,
  ) {
    return this.subcategoryService.findAll(
      categoryId,
      includeInactive === 'true',
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcategoryService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateSubcategoryDto) {
    return this.subcategoryService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSubcategoryDto,
  ) {
    return this.subcategoryService.update(id, dto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateSubcategoryStatusDto,
  ) {
    return this.subcategoryService.updateStatus(id, dto);
  }
}