import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes, Scroll } from '@angular/router';
import { HomeModule } from './home/home.module';
import { HomepageComponent } from './home/homepage/homepage.component';
import { PagesModule } from './pages/pages.module';
import { PaymentMethodsComponent } from './order/payment-methods/payment-methods.component';
import { CreditcardComponent } from './order/creditcard/creditcard.component';
import { ProductDetailsComponent } from './home/product-details/product-details.component';
import { SubmitOrderComponent } from './order/submit-order/submit-order.component';

const scrollOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  scrollOffset: [0, 64],
};
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  { path: 'productDetails/:id', component: ProductDetailsComponent },
  { path: 'paymentMethod/:id', component: PaymentMethodsComponent },
  { path: 'creditCard', component: CreditcardComponent },
  { path: 'submitOrder/:id', component: SubmitOrderComponent },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'order',
    loadChildren: () =>
      import('./order/order.module').then((m) => m.OrderModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'seller',
    loadChildren: () =>
      import('./seller/seller.module').then((m) => m.SellerModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, scrollOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
