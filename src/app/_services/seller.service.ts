import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seller } from '../_Models/Seller';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient) { }

  dbUrl: string = 'https://localhost:44364/Seller/';

  getAllSellers() {
    return this.http.get<Seller[]>(this.dbUrl);
  }

  addSeller(newSeller: Seller) {
    return this.http.post<Seller>(this.dbUrl, newSeller);
  }

  getSellerById(id: number) {
    return this.http.get<Seller>(this.dbUrl + id);
  }
  updateSeller(id: number, Seller: Seller) {
    return this.http.patch<Seller>(this.dbUrl + id, Seller);
  }

  deleteSellerById(id: number) {
    return this.http.delete(this.dbUrl + id);
  }
}
