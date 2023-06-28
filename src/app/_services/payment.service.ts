import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentMethod } from '../_Models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  dbUrl: string = 'https://localhost:44364/PaymentMethod/';

  getAllPaymentMethods() {
    return this.http.get<PaymentMethod[]>(this.dbUrl);
  }

  addPaymentMethod(newPaymentMethod: PaymentMethod) {
    return this.http.post<PaymentMethod>(this.dbUrl, newPaymentMethod);
  }

  getPaymentMethodById(id: number) {
    return this.http.get<PaymentMethod>(this.dbUrl + id);
  }
  updatePaymentMethod(id: number, PaymentMethod: PaymentMethod) {
    return this.http.patch<PaymentMethod>(this.dbUrl + id, PaymentMethod);
  }

  deletePaymentMethodById(id: number) {
    return this.http.delete(this.dbUrl + id);
  }
}
