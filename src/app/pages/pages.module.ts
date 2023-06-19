import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent,RegistrationComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule
  ],
  exports:[
    LoginComponent,
    RegistrationComponent
  ]
})
export class PagesModule { }
