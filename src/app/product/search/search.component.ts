import { Component, OnInit } from '@angular/core';
import { Product } from '../../_Models/product';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';
import { ProductSearchServiceService } from '../../_services/product-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  pagedProducts: Product[] = [];
  products: Product[] = [];
  pageSize = 6;
  pageSizeOptions: number[] = [6, 18, 25, 100];
  filteredProducts: Product[] = [];

  constructor(
    private cartSrvices: CartService,
    private productservice: ProductService,
    private productSearchService: ProductSearchServiceService
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
      this.onPageChange({
        pageIndex: 0,
        pageSize: this.pageSize,
        length: this.filteredProducts.length,
      });
      console.log(this.products);
      this.filterProducts('');
      this.productSearchService.searchQuery$.subscribe((query) => {
        this.filterProducts(query);
      });
    });

    console.log(this.pagedProducts);
    this.onPageChange({
      pageIndex: 0,
      pageSize: this.pageSize,
      length: this.filteredProducts.length,
    });
  }

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedProducts = this.filteredProducts.slice(startIndex, endIndex);
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
    this.pagedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  filterProducts(query: string): void {
    if (query.trim() === '') {
      this.filteredProducts = this.products;
    } else {
      const lowerCaseQuery = query.toLowerCase();
      this.filteredProducts = this.products.filter((product) => {
        return (
          product.brandName.toLowerCase().includes(lowerCaseQuery) ||
          product.title.toLowerCase().includes(lowerCaseQuery)
        );
      });
    }
  }
}
