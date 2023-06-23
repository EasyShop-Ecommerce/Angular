import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  dbUrl: string = 'https://localhost:44364/api/Product/';

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
}

