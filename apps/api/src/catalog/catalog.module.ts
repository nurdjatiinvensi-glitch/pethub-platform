import { Module } from '@nestjs/common';

import { CategoryController } from './category/category.controller.js';
import { CategoryService } from './category/category.service.js';

import { SubcategoryController } from './subcategory/subcategory.controller.js';
import { SubcategoryService } from './subcategory/subcategory.service.js';

import { ItemController } from './item/item.controller.js';
import { ItemService } from './item/item.service.js';

@Module({
  controllers: [
    CategoryController,
    SubcategoryController,
    ItemController,
  ],
  providers: [
    CategoryService,
    SubcategoryService,
    ItemService,
  ],
})
export class CatalogModule {}