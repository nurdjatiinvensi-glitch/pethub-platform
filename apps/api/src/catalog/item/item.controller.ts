
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import type { CreateItemDto } from './dto/create-item.dto.js';
import { ItemService } from './item.service.js';

@Controller('catalog/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  // GET: Daftar Item
  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  // GET: Detail Item
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }

  // POST: Tambah Item
  @Post()
  create(@Body() data: CreateItemDto) {
    return this.itemService.create(data);
  }

  // PUT: Update seluruh / sebagian data Item
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<CreateItemDto>,
  ) {
    return this.itemService.update(id, data);
  }

  // PATCH: Ubah status aktif / nonaktif
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

    return this.itemService.updateStatus(id, isActive);
  }

  // DELETE: Hapus Item
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(id);
  }
}
