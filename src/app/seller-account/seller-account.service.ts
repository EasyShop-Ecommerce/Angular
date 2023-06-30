import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { Login, User } from '../_Models/Login';
import { HttpClient } from '@angular/common/http';
import { Seller } from '../_Models/Seller';

@Injectable({
  providedIn: 'root',
})
export class SellerAccountService {
  private currentSellerSource = new BehaviorSubject<User | null>(null);
  currentSeller$ = this.currentSellerSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  register(values: any) {
    return this.http
      .post<Seller>('https://localhost:44364/SellerAccount/register', values)
      .pipe(
        map((seller) => {
          console.log(seller);
          this.currentSellerSource.next(seller);
          return seller;
        })
      );
  }

  login(values: any) {
    return this.http
      .post<Login>('https://localhost:44364/SellerAccount/login', values)
      .pipe(
        map((seller) => {
          console.log(seller);
          localStorage.setItem('Seller token', seller.token);
          localStorage.setItem('SellerId', seller.sellerId?.toString());

          this.currentSellerSource.next(seller);
          return seller;
        })
      );
  }

  logout() {
    localStorage.removeItem('Seller token');
    localStorage.removeItem('SellerId');
    this.currentSellerSource.next(null);
    this.router.navigateByUrl('CustomerAccount/login');
  }

  GetCurrentSeller(): number {
    if (localStorage.getItem('SellerId') != null) {
      var id = parseInt(localStorage.getItem('SellerId'));
      return id;
    }
    return null;
  }
}
