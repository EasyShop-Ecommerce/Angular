import { Component, ElementRef, ViewChild, Output } from '@angular/core';
import { Product } from '../../_Models/product';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  pagedProducts: any[] = [];
  pageSize = 6;
  pageSizeOptions: number[] = [6, 18, 25, 100];

  constructor(private cartSrvices: CartService) {
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
  }

  slides = [
    { image: '../../../assets/Images/pexels-josh-sorenson-5349808.jpg' },
    { image: '../../../assets/Images/pexels-soulful-pizza-6751555.jpg' },
    { image: '../../../assets/Images/pexels-royal-anwar-983497.jpg' },
    { image: '../../../assets/Images/pexels-shvets-production-6984661.jpg' },
    { image: '../../../assets/Images/pexels-alexandra-maria-336372.jpg' },
    { image: '../../../assets/Images/pexels-godisable-jacob-1936848.jpg' },
  ];
  products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      price: 10,
      description: 'Description 1',
      image: '../../../assets/Images/bed.jpeg',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 20,
      description: 'Description 2',
      image: '../../../assets/Images/pexels-alexandra-maria-336372.jpg',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 30,
      description: 'Description 2',
      image: '../../../assets/Images/pexels-godisable-jacob-1936848.jpg',
    },
    {
      id: 4,
      name: 'Product 4',
      price: 40,
      description: 'Description 2',
      image: '../../../assets/Images/pexels-josh-sorenson-5349808.jpg',
    },
    {
      id: 5,
      name: 'Product 5',
      price: 50,
      description: 'Description 2',
      image: '../../../assets/Images/pexels-royal-anwar-983497.jpg',
    },
    {
      id: 6,
      name: 'Product 6',
      price: 60,
      description: 'Description 2',
      image: '../../../assets/Images/pexels-shvets-production-6984661.jpg',
    },
    {
      id: 7,
      name: 'Product 7',
      price: 70,
      description: 'Description 2',
      image: '../../../assets/Images/pexels-soulful-pizza-6751555.jpg',
    },
    {
      id: 8,
      name: 'Product 8',
      price: 80,
      description: 'Description 2',
      image: '../../../assets/Images/bed.jpeg',
    },
    {
      id: 9,
      name: 'Product 9',
      price: 90,
      description: 'Description 2',
      image: '../../../assets/Images/bed.jpeg',
    },
    {
      id: 10,
      name: 'Product 10',
      price: 100,
      description: 'Description 2',
      image: '../../../assets/Images/bed.jpeg',
    },
    {
      id: 11,
      name: 'Product 11',
      price: 110,
      description: 'Description 2',
      image: '../../../assets/Images/bed.jpeg',
    },
  ];

  addToCart(product: Product): void {
    this.cartSrvices.addToCart(product);
  }
}
