import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NewSellerComponent } from './new-seller/new-seller.component';

const routes: Routes = [
  { path: 'signIn', component: LoginComponent },
  { path: 'signUp', component: RegistrationComponent },
  { path: 'seller', component: NewSellerComponent },]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
