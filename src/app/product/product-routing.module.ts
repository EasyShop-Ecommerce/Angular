import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { SearchComponent } from './search/search.component';
import { SearchByCatComponent } from './search-by-cat/search-by-cat.component';

const routes: Routes = [
  { path: 'addProduct', component: AddProductComponent },
  { path: 'search', component: SearchComponent },
  { path: 'searchCat', component: SearchByCatComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
