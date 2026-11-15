
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { CategoryService } from './category.service.js';
import type { CreateCategoryDto } from './dto/create-category.dto.js';

@Controller('catalog/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll(@Query('includeInactive') includeInactive?: string) {
    return this.categoryService.findAll(includeInactive === 'true');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateCategoryDto) {
    return this.categoryService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<CreateCategoryDto>,
  ) {
    return this.categoryService.update(id, data);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('isActive') isActive: unknown,
  ) {
    if (typeof isActive !== 'boolean') {
      throw new BadRequestException(
        'isActive harus berupa true atau false',
      );
    }

    return this.categoryService.updateStatus(id, isActive);
  }
}
