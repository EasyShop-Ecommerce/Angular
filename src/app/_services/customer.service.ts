import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../_Models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  dbUrl: string = 'https://localhost:44364/Customer/';

  getAllCustomers() {
    return this.http.get<Customer[]>(this.dbUrl);
  }

  addCustomer(newCustomer: Customer) {
    return this.http.post<Customer>(this.dbUrl, newCustomer);
  }

  getCustomerById(id: number) {
    return this.http.get<Customer>(this.dbUrl + id);
  }
  updateCustomer(id: number, cust: Customer) {
    return this.http.put<Customer>(this.dbUrl + id, cust);
  }

  deleteCustomerById(id: number) {
    return this.http.delete(this.dbUrl + id);
  }
}
