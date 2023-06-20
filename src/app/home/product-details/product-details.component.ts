import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_Models/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productId:number=0
   product: Product = {
    name: 'Product Name',
    description: 'Product description',
    price:100,
    image:" ",
    id:0
    // Initialize other product attributes
  };

  // comments: Comment[] = [
  //   { user: 'User 1', content: 'Comment 1' },
  //   { user: 'User 2', content: 'Comment 2' },
  //   // Initialize other comments
  // ];

  rating: number = 3; // Initialize with default rating value

  otherProducts: Product[] = [
    // Other products in the same category
  ];

  constructor(private route: ActivatedRoute,private productService:ProductService) { }

  ngOnInit() {
    const productIdString = this.route.snapshot.paramMap.get('id');
  this.productId = productIdString ? parseInt(productIdString, 10) : 0;
    console.log(this.productId)
    // this.productService.getProductById(this.productId).subscribe(a=>{

    // })
    // Fetch otherProducts from a service or API
  }

  onRatingChange(event: number) {
    this.rating = event;
    // You can perform additional actions with the new rating value here
    console.log('New rating:', this.rating);
  }

  
}

