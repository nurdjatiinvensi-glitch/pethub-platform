export interface CreateItemSpecificationDto {
  name: string;
  value: string;
}

export interface CreateItemDto {
  itemCode: string;
  name: string;
  itemType?: string;
  description?: string;
  price: number;
  imageUrl?: string;
  categoryId: string;
  subcategoryId: string;
  ownerType?: string;
  ownerId?: string;
  specifications?: CreateItemSpecificationDto[];
}