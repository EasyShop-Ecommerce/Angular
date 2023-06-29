import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../_Models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  dbUrl: string = 'https://localhost:44364/Order/';

  getAllOrders() {
    return this.http.get<Order[]>(this.dbUrl);
  }

  addOrder(newOrder: Order) {
    return this.http.post<Order>(this.dbUrl, newOrder);
  }

  getOrderById(id: number) {
    return this.http.get<Order>(this.dbUrl + id);
  }
  updateOrder(id: number, Order: Order) {
    return this.http.put<Order>(this.dbUrl + id, Order);
  }

  deleteOrderById(id: number) {
    return this.http.delete(this.dbUrl + id);
  }
}
