import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartItemsComponent } from '../order/cart-items/cart-items.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent, CartItemsComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PagesRoutingModule],
  exports: [LoginComponent, RegistrationComponent, CartItemsComponent],
})
export class PagesModule {}
