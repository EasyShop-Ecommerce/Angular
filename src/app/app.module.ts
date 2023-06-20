import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeModule} from './home/home.module'
import {PagesModule} from './pages/pages.module'
import { CartService } from './_services/cart.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HomeModule,
    ReactiveFormsModule,
    PagesModule,
    HttpClientModule,
    RouterModule,

  
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
