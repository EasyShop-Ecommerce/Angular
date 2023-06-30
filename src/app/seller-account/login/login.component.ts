import { Component } from '@angular/core';
import { SellerAccountService } from '../seller-account.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private sellerService: SellerAccountService,
    private router: Router
  ) {}
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    // Add your login logic here
    this.sellerService.login(this.loginForm.value).subscribe({
      next: (user) => this.router.navigateByUrl('/'),
    });
  }
}
