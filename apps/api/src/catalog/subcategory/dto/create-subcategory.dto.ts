export interface CreateSubcategoryDto {
  name: string;
  description?: string | null;
  categoryId: string;
}