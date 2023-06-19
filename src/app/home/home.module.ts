import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [FooterComponent,NavbarComponent, HomepageComponent],
  imports: [
    CommonModule, 
    // CarouselModule.forRoot(),
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatPaginatorModule,
    CarouselModule
 
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    HomepageComponent,

  ]
})
export class HomeModule {}
