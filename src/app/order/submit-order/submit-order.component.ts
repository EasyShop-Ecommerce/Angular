import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_Models/product';

@Component({
  selector: 'app-submit-order',
  templateUrl: './submit-order.component.html',
  styleUrls: ['./submit-order.component.css']
})
export class SubmitOrderComponent {
product!:Product
date!:string | null



  constructor() { }

  ngOnInit(): void {
    const productData = localStorage.getItem('selectedProduct');
    const shipDate = localStorage.getItem('Shipdate');
    if (productData) {
      this.product = JSON.parse(productData);
      
    }
    if(shipDate){
      this.date=JSON.parse(shipDate);

    }


}
}


