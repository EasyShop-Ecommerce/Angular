import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductImages } from '../_Models/ProductImage';

@Injectable({
  providedIn: 'root'
})
export class ProductImagesService {

  constructor(private http: HttpClient) { }

  dbUrl: string = '';

  getAllProductImagess() {
    return this.http.get<ProductImages[]>(this.dbUrl);
  }

  addProductImages(newProductImages: ProductImages) {
    return this.http.post<ProductImages>(this.dbUrl, newProductImages);
  }

  getProductImagesById(id: number) {
    return this.http.get<ProductImages>(this.dbUrl + id);
  }
  updateProductImages(id: number, ProductImages: ProductImages) {
    return this.http.patch<ProductImages>(this.dbUrl + id, ProductImages);
  }

  deleteProductImagesById(id: number) {
    return this.http.delete(this.dbUrl + id);
  }
}
