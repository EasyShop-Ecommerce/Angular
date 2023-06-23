import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditcardComponent } from './creditcard/creditcard.component';

const routes: Routes = [
  { path: 'paymentMethod/:id', component: PaymentMethodChangeEvent },
  { path: 'creditCard', component: CreditcardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
