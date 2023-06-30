import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ProductRoutingModule } from './product-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { SearchComponent } from './search/search.component';
import { SearchByCatComponent } from './search-by-cat/search-by-cat.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SellerModule } from '../seller/seller.module';

@NgModule({
  declarations: [AddProductComponent, SearchComponent, SearchByCatComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatFormFieldModule,
    SellerModule,
  ],
  exports: [AddProductComponent],
})
export class ProductModule {}
