import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CartItemsComponent } from '../order/cart-items/cart-items.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'cart', component: CartItemsComponent },
  { path: 'productDetails/:id', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
