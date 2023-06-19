import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDetails } from '../_Models/orderDetails';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

    constructor(private http: HttpClient) { }
  
    dbUrl: string = '';
  
    getAllOrderDetailss() {
      return this.http.get<OrderDetails[]>(this.dbUrl);
    }
  
    addOrderDetails(newOrderDetails: OrderDetails) {
      return this.http.post<OrderDetails>(this.dbUrl, newOrderDetails);
    }
  
    getOrderDetailsById(id: number) {
      return this.http.get<OrderDetails>(this.dbUrl + id);
    }
    updateOrderDetails(id: number, OrderDetails: OrderDetails) {
      return this.http.patch<OrderDetails>(this.dbUrl + id, OrderDetails);
    }
  
    deleteOrderDetailsById(id: number) {
      return this.http.delete(this.dbUrl + id);
    }
}
