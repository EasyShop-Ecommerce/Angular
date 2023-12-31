import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { NewSellerComponent } from './new-seller/new-seller.component';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent, NewSellerComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PagesRoutingModule],
  exports: [LoginComponent, RegistrationComponent,NewSellerComponent],
})
export class PagesModule {}
