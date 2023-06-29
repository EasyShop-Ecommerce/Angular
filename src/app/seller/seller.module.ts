import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { SellerRoutingModule } from './seller-routing.module';

@NgModule({
  declarations: [SellerDashboardComponent],
  imports: [CommonModule, SellerRoutingModule],
  exports: [SellerDashboardComponent],
})
export class SellerModule {}
