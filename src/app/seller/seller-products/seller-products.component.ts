import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/_Models/product';
import { ProductService } from 'src/app/_services/product.service';
import { EditImagesDialogComponent } from '../edit-images-dialog/edit-images-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
import { DeleteProductDialogComponent } from '../delete-product-dialog/delete-product-dialog.component';
import { SellerAccountService } from 'src/app/seller-account/seller-account.service';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css'],
})
export class SellerProductsComponent {
  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = [
    'image',
    'BrandName',
    'title',
    'price',
    'availableQuantity',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  products: Product[];
  loggedSellerId: number;
  @Input() item = '';
  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private authService: SellerAccountService
  ) {}

  ngOnInit() {
    this.loggedSellerId = this.authService.GetCurrentSeller();
    this.getAllSellerProducts();
  }

  getAllSellerProducts() {
    this.productService.getAllProducts().subscribe(
      (response: Product[]) => {
        this.products = response.filter(
          (product) => product.sellerId == this.loggedSellerId
        );
        this.dataSource = new MatTableDataSource<Product>(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.products);
      },
      (error) => {
        console.log('Error retrieving seller products:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editImages(product: Product) {
    const dialogRef = this.dialog.open(EditImagesDialogComponent, {
      width: '400px',
      data: product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        const { productId, color, files } = result;
        this.productService.uploadImages(productId, color, files).subscribe(
          (response) => {
            console.log(response);
            console.log('Images uploaded successfully.');
            product.defaultImage = response[0].image;
          },
          (error) => {
            console.error('Error uploading images:', error);
          }
        );
      }
    });
  }

  updateProductPriceAndQuantity(product: Product) {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '400px',
      data: { product, editFields: ['price', 'qty'] },
    });

    dialogRef.afterClosed().subscribe((result: Product) => {
      if (result) {
        console.log(result);
        product.price = result.price;
        product.AvailableQuantity = result['qty'];

        this.productService.updateProduct(product.id, product).subscribe(
          (response) => {
            console.log('Product updated successfully:', response);
            this.getAllSellerProducts();
          },
          (error) => {
            console.error('Error updating product:', error);
          }
        );
      }
    });
  }

  deleteProduct(product: Product) {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent, {
      width: '400px',
      data: 'Are you sure you want to delete this product?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.productService.deleteProductById(product.id).subscribe(
          () => {
            console.log('Product deleted successfully');
          },
          (error) => {
            console.error('Error deleting product:', error);
          }
        );
      }
    });
  }
}
