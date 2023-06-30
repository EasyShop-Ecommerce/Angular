import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerAccountService } from '../customer-account.service';
import { Router } from '@angular/router';
import { SellerAccountService } from 'src/app/seller-account/seller-account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private customerService: CustomerAccountService,
    private sellerService: SellerAccountService,
    private router: Router
  ) {}
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    // Add your login logic here
    this.customerService.login(this.loginForm.value).subscribe({
      next: (user) => this.router.navigateByUrl('/'),
    });
  }

  submitCustomer() {
    // Add your login logic here
    this.customerService.login(this.loginForm.value).subscribe({
      next: (user) => this.router.navigateByUrl(''),
    });
  }
  submitSeller() {
    this.sellerService.login(this.loginForm.value).subscribe({
      next: (user) => this.router.navigateByUrl('/sellerDashboard'),
    });
  }
}
