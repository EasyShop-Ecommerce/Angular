import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

import { OrderRoutingModule } from './order-routing.module';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { CreditcardComponent } from './creditcard/creditcard.component';
import { SubmitOrderComponent } from './submit-order/submit-order.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';

@NgModule({
  declarations: [
    PaymentMethodsComponent,
    CartItemsComponent,
    CreditcardComponent,
    SubmitOrderComponent,
    UserOrdersComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ],
  exports: [PaymentMethodsComponent, CartItemsComponent, CreditcardComponent,SubmitOrderComponent,UserOrdersComponent],
})
export class OrderModule {}
