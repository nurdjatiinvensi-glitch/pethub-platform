
export interface CreateItemSpecificationDto {
  name: string;
  value: string;
}

export interface CreateItemDto {
  // Item Code dibuat otomatis oleh backend
  // Tetap optional untuk kompatibilitas proses update
  itemCode?: string;

  name: string;
  itemType?: string;
  description?: string;
  price: string;
  imageUrl?: string;
  categoryId: string;
  subcategoryId: string;
  ownerType?: string;
  ownerId?: string;
  isFeedCareEligible?: boolean;
  specifications?: CreateItemSpecificationDto[];
}
