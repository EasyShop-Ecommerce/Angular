import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './home/home.module';
import { HomepageComponent } from './home/homepage/homepage.component';
import { PagesModule } from './pages/pages.module';
import { PaymentMethodsComponent } from './order/payment-methods/payment-methods.component';
import { CreditcardComponent } from './order/creditcard/creditcard.component';

const routes: Routes = [
  {
    path: ' ',
    loadChildren: () =>
      import('./home/home.module').then(
        (m) => m.HomeModule
      ),
  },
  {path:"paymentMethod/:id",component:PaymentMethodsComponent},
  {path:"creditCard",component:CreditcardComponent},
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then(
        (m) => m.PagesModule
      ),
  },
  {
    path: 'order',
    loadChildren: () =>
      import('./order/order.module').then(
        (m) => m.OrderModule
      ),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./product/product.module').then(
        (m) => m.ProductModule
      ),
  },
  { path: 'CustomerAccount',loadChildren: () =>import('./customer-account/customer-account.module').then((m) => m.CustomerAccountModule),},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
