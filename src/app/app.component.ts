import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerAccountService } from './customer-account/customer-account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  constructor(private router: Router,private customerService:CustomerAccountService) {}
  shouldDisplayNavbarAndFooter(): boolean {
    // Get the current route path
    const currentRoute = this.router.url;
  
    // Specify the route paths where the navbar and footer should not be displayed
    const disallowedRoutes = [
      '/signIn',
      '/signUp',
      '/seller',
      '/creditCard',
      '/CustomerAccount/login',
      '/CustomerAccount/register'
    ];
  
    // Check if the current route is in the disallowed routes
    return !disallowedRoutes.includes(currentRoute);
  }
  
  loadCurrentUser()
  {
    const token=localStorage.getItem('token')
    if(token) this.customerService.loadCurrentUser(token).subscribe()
  }
}
