import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreProducts } from '../_Models/StoreProducts';

@Injectable({
  providedIn: 'root'
})
export class StoreProductsService {

  constructor(private http: HttpClient) { }
  
  dbUrl: string = '';

  getAllStoreProductss() {
    return this.http.get<StoreProducts[]>(this.dbUrl);
  }

  addStoreProducts(newStoreProducts: StoreProducts) {
    return this.http.post<StoreProducts>(this.dbUrl, newStoreProducts);
  }

  getStoreProductsById(id: number) {
    return this.http.get<StoreProducts>(this.dbUrl + id);
  }
  updateStoreProducts(id: number, StoreProducts: StoreProducts) {
    return this.http.patch<StoreProducts>(this.dbUrl + id, StoreProducts);
  }

  deleteStoreProductsById(id: number) {
    return this.http.delete(this.dbUrl + id);
  }
}
