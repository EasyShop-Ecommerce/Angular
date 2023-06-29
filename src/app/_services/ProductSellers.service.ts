import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductSellers } from '../_Models/ProductSellers';

@Injectable({
  providedIn: 'root',
})
export class ProductSellersService {
  constructor(private http: HttpClient) {}

  //dbUrl: string = 'https://localhost:44364/api/ProductSeller/';
  dbUrl: string = 'https://localhost:7239/api/ProductSeller/';

  getAllProductSeller() {
    return this.http.get<ProductSellers[]>(this.dbUrl);
  }

  addProductSeller(newProductSeller: ProductSellers) {
    return this.http.post<ProductSellers>(this.dbUrl, newProductSeller);
  }

  getProductSellerById(id: number, SellerId: number) {
    return this.http.get<ProductSellers>(this.dbUrl + id + SellerId);
  }
  updateProductSeller(id: number, ProductSeller: ProductSellers) {
    return this.http.patch<ProductSellers>(this.dbUrl + id, ProductSeller);
  }

  deleteProductSellerById(id: number) {
    return this.http.delete(this.dbUrl + id);
  }
}
