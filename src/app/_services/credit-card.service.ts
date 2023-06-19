import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { creditCard } from '../_Models/creditCard';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(private http: HttpClient) { }

  dbUrl: string = '';

  getAllcreditCards() {
    return this.http.get<creditCard[]>(this.dbUrl);
  }

  addcreditCard(newcreditCard: creditCard) {
    return this.http.post<creditCard>(this.dbUrl, newcreditCard);
  }

  getCardById(id: number) {
    return this.http.get<creditCard>(this.dbUrl + id);
  }
  updatecreditCard(id: number, card: creditCard) {
    return this.http.patch<creditCard>(this.dbUrl + id, card);
  }

  deletecreditCardById(id: number) {
    return this.http.delete(this.dbUrl + id);
  }
}
