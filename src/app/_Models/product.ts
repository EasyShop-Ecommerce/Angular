export interface Product {
  id: number;
  brandName: string;
  title: string;
  description: string;
  operatingSystem: string;
  specialFeatures: string;
  memoryStorageCapacity: string;
  subCategoryId: number;
  shipperId: number;
  hardDiskSize: string;
  material: string;
  code: string;
  AvailableQuantity: number;
  price: number;
  sellerId: number;
  reviewsCount?: number,
    reviewsAverage?:number
}
