import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { AddProductComponent } from '../product/add-product/add-product.component';
import { SellerProductsComponent } from './seller-products/seller-products.component';
import { SellerOrdersComponent } from './seller-orders/seller-orders.component';

const routes: Routes = [
  {
    path: '',
    component: SellerDashboardComponent,
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    //outlet: 'dashboardOutlet',
  },
  {
    path: 'products',
    component: SellerProductsComponent,
    //outlet: 'dashboardOutlet',
  },
  {
    path: 'orders',
    component: SellerOrdersComponent,
    //outlet: 'dashboardOutlet',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
