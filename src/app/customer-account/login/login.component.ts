import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerAccountService } from '../customer-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private customerService: CustomerAccountService,
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
}
