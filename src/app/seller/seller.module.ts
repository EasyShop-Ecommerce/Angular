import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { SellerRoutingModule } from './seller-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SellerSidebarComponent } from './seller-sidebar/seller-sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { SellerOrdersComponent } from './seller-orders/seller-orders.component';
import { SellerProductsComponent } from './seller-products/seller-products.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { EditImagesDialogComponent } from './edit-images-dialog/edit-images-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditProductDialogComponent } from './edit-product-dialog/edit-product-dialog.component';
import { DeleteProductDialogComponent } from './delete-product-dialog/delete-product-dialog.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    SellerDashboardComponent,
    SellerSidebarComponent,
    SellerOrdersComponent,
    SellerProductsComponent,
    EditImagesDialogComponent,
    EditProductDialogComponent,
    DeleteProductDialogComponent,
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
  ],
  exports: [SellerDashboardComponent, SellerSidebarComponent],
})
export class SellerModule {}
