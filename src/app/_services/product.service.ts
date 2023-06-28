import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_Models/product';
import { ProductSellers } from '../_Models/ProductSellers';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  //dbUrl: string = 'https://localhost:44364/api/Product/';
  dbUrl: string = 'https://localhost:7239/api/Product/';

  getAllProducts() {
    return this.http.get<Product[]>(this.dbUrl);
  }

  addProduct(newProduct: Product) {
    return this.http.post<Product>(this.dbUrl, newProduct);
  }

  getProductById(id: number) {
    return this.http.get<Product>(this.dbUrl + id);
  }
  updateProduct(id: number, pro: Product) {
    return this.http.put<Product>(this.dbUrl + id, pro);
  }

  deleteProductById(id: number) {
    return this.http.delete(this.dbUrl + id);
  }

  addProductSeller(productSeller: ProductSellers) {
    return this.http.post<ProductSellers>(
      `https://localhost:7239/api/productSeller`,
      productSeller
    );
  }

  uploadImages(productId: number, color: string, files: FileList) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('fileCollection', files[i]);
    }

    return this.http.put(
      `${this.dbUrl}${productId}/UploadImages/${color}`,
      formData
    );
  }

  getProductImages(productId: number, color: string) {
    return this.http.get(this.dbUrl + productId + '/images/color/' + color);
  }
}
