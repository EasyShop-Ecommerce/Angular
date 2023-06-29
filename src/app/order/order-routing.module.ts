import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditcardComponent } from './creditcard/creditcard.component';
import { SubmitOrderComponent } from './submit-order/submit-order.component';

const routes: Routes = [
  { path: 'paymentMethod/:id', component: PaymentMethodChangeEvent },
  { path: 'creditCard', component: CreditcardComponent },
  { path: 'submitOrder/:id', component: SubmitOrderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
