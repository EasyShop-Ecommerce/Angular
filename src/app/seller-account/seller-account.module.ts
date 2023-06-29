import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SellerAccountRoutingModule } from './seller-account-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BehaviorSubject, map } from 'rxjs';
import { Seller } from '../_Models/Seller';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login, User } from '../_Models/Login';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SellerAccountRoutingModule,
    ReactiveFormsModule
  ]
})
export class SellerAccountModule {
}