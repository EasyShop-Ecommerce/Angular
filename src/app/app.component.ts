import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  constructor(private router: Router) {}
  shouldDisplayNavbarAndFooter(): boolean {
    // Get the current route path
    const currentRoute = this.router.url;
  
    // Specify the route paths where the navbar and footer should not be displayed
    const disallowedRoutes = [
      '/signIn',
      '/signUp',
      '/seller'
    ];
  
    // Check if the current route is in the disallowed routes
    return !disallowedRoutes.includes(currentRoute);
  }
  
}
