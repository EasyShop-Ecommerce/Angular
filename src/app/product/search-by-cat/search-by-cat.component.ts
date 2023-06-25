import { Component, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/_Models/product';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';
import { SearchbycatService } from 'src/app/_services/searchbycat.service';

@Component({
  selector: 'app-search-by-cat',
  templateUrl: './search-by-cat.component.html',
  styleUrls: ['./search-by-cat.component.css'],
})
export class SearchByCatComponent {
  pageSize = 6;
  pageSizeOptions: number[] = [6, 18, 25, 100];
  pagedProducts: Product[] = [];
  selectedCategoryId: number | null = null;
  filteredProducts: Product[] = [];
  products: Product[] = [];
  private selectedCategoryIdSubscription: Subscription | undefined;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private bucatServise:SearchbycatService
  ) {
    this.onPageChange({
      pageIndex: 0,
      pageSize: this.pageSize,
      length: this.products.length,
    });
  }



  ngOnInit() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      console.log(this.products)
      // this.filterProducts();
      // this.updatePageData();
      console.log(this.filteredProducts)
    });

    this.selectedCategoryIdSubscription = this.bucatServise.selectedCategoryId$.subscribe((categoryId) => {
      this.selectedCategoryId = categoryId;
      console.log(this.products)

      console.log(this.selectedCategoryId)
      this.filterProducts();
      console.log(this.filteredProducts)

      this.updatePageData();
      console.log(this.filteredProducts)

    });
  }


  private filterProducts(): void {
    console.log(this.selectedCategoryId)
console.log(this.products)
    if (this.selectedCategoryId === null) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.subCategoryId === this.selectedCategoryId);
      console.log(this.filteredProducts)
    }
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

  updatePageData(): void {
    const startIndex = 0;
    const endIndex = startIndex + this.pageSize;
    this.pagedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  // ngOnDestroy() {
  //   this.selectedCategoryIdSubscription?.unsubscribe();
  // }

}
