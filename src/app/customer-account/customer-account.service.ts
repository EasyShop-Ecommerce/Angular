import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Router } from '@angular/router';
import { Customer } from '../_Models/customer';
import { Login, User } from '../_Models/Login';

@Injectable({
  providedIn: 'root',
})
export class CustomerAccountService {
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  register(values: any) {
    return this.http
      .post<Customer>(
        'https://localhost:44364/CustomerAccount/register',
        values
      )
      .pipe(
        map((customer) => {
          console.log(customer);
          this.currentUserSource.next(customer);
          return customer;
        })
      );
  }

  loadCurrentUser(token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http
      .get<Login>('https://localhost:44364/CustomerAccount/user', { headers })
      .pipe(
        map((user) => {
          console.log(user);
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        })
      );
  }

  login(values: any) {
    return this.http
      .post<Login>('https://localhost:44364/CustomerAccount/login', values)
      .pipe(
        map((customer) => {
          console.log(customer);
          localStorage.setItem('token', customer.token);
          localStorage.setItem('customerId', customer.customerId.toString());

          this.currentUserSource.next(customer);
          return customer;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('customerId');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('CustomerAccount/login');
  }

  GetCurrentCustomer(): number {
    if (localStorage.getItem('customerId') != null) {
      var id = parseInt(localStorage.getItem('customerId'));
      return id;
    }
    return null;
  }
}
