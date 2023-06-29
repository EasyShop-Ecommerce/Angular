import { Component, ElementRef, ViewChild, Output } from '@angular/core';
import { Product } from '../../_Models/product';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';
import { ProductSellersService } from 'src/app/_services/ProductSellers.service';
import { ProductSellers } from 'src/app/_Models/ProductSellers';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  pagedProducts: Product[] = [];
  products: Product[] = [];
  productPrice: number = 0;
  prices: ProductSellers[] = [];
  pageSize = 6;
  pageSizeOptions: number[] = [6, 18, 25, 100];
  defaultImage: string;

  constructor(
    private cartSrvices: CartService,
    private productservice: ProductService,
    private productSellerService: ProductSellersService
  ) {
    this.onPageChange({
      pageIndex: 0,
      pageSize: this.pageSize,
      length: this.products.length,
    });
  }
  ngOnInit() {
    this.productservice.getAllProducts().subscribe((data) => {
      this.products = data;
      // this.defaultImage = 'data:image/jpeg;base64,' + data.defaultImage;

      this.onPageChange({
        pageIndex: 0,
        pageSize: this.pageSize,
        length: this.products.length,
      });
      console.log(this.products);
    });

    console.log(this.pagedProducts);
    this.onPageChange({
      pageIndex: 0,
      pageSize: this.pageSize,
      length: this.products.length,
    });
  }

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedProducts = this.products.slice(startIndex, endIndex);
    console.log(this.pagedProducts);
  }

  slides = [
    { image: '../../../assets/Images/pexels-josh-sorenson-5349808.jpg' },
    { image: '../../../assets/Images/pexels-soulful-pizza-6751555.jpg' },
    { image: '../../../assets/Images/pexels-royal-anwar-983497.jpg' },
    { image: '../../../assets/Images/pexels-shvets-production-6984661.jpg' },
    { image: '../../../assets/Images/pexels-alexandra-maria-336372.jpg' },
    { image: '../../../assets/Images/pexels-godisable-jacob-1936848.jpg' },
  ];

  addToCart(product: Product): void {
    this.cartSrvices.addToCart(product);
  }

  updatePageData(): void {
    const startIndex = 0;
    const endIndex = startIndex + this.pageSize;
    this.pagedProducts = this.products.slice(startIndex, endIndex);
  }
}
