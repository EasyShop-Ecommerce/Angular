import { Component, ElementRef, ViewChild } from '@angular/core';
import {Product} from '../../_Models/product'
import {MatPaginatorModule} from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {




  // Paginator variables
  pagedProducts: any[] = [];
  pageSize = 6;
  pageSizeOptions: number[] = [6, 18, 25, 100];

  constructor() {
    
    this.onPageChange({ pageIndex: 0, pageSize: this.pageSize, length: this.products.length });
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
    { id: 1, name: 'Product 1', price: 10, description: 'Description 1',image:'../../../assets/Images/bed.jpeg' },
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2',image:'../../../assets/Images/bed.jpeg' },
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2' ,image:'../../../assets/Images/bed.jpeg'},
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2',image:'../../../assets/Images/bed.jpeg' },
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2' ,image:'../../../assets/Images/bed.jpeg'},
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2',image:'../../../assets/Images/bed.jpeg' },
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2' ,image:'../../../assets/Images/bed.jpeg'},
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2' ,image:'../../../assets/Images/bed.jpeg'},
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2' ,image:'../../../assets/Images/bed.jpeg'},
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2' ,image:'../../../assets/Images/bed.jpeg'},
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2',image:'../../../assets/Images/bed.jpeg' },
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2',image:'../../../assets/Images/bed.jpeg' },
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2' ,image:'../../../assets/Images/bed.jpeg'},
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2',image:'../../../assets/Images/bed.jpeg' },
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2',image:'../../../assets/Images/bed.jpeg' },
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2',image:'../../../assets/Images/bed.jpeg' },
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2',image:'../../../assets/Images/bed.jpeg' },
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2',image:'../../../assets/Images/bed.jpeg' },
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2' ,image:'../../../assets/Images/bed.jpeg'},
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2',image:'../../../assets/Images/bed.jpeg' },
    // Add more products as needed
  ];

}
