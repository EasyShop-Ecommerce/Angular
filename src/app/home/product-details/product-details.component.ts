import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/_Models/Review';
import { Product } from 'src/app/_Models/product';
import { ProductService } from 'src/app/_services/product.service';
import { ReviewService } from 'src/app/_services/review.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  productId: number = 0;
  rating: number = 3;
  newcomment: string = '';
  stars: number[] = [];
  comments: string[] = [];
  products: Product[] = [];
  randomProducts:Product[]=[]
  reviews: Review[] = [];
  productreviews: Review[] = [];
  product: Product = {
    name: 'Product Name',
    description: 'Product description',
    price: 100,
    image: ' ',
    id: 0,
  };
  newReview: Review = {
    ProductId: this.productId,
    CustomerId: 0,
    rate: this.rating,
    comment: this.newcomment,
  };

  otherProducts: Product[] = [
    // Other products in the same category
  ];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    //the id product u opend
    const productIdString = this.route.snapshot.paramMap.get('id');
    this.productId = productIdString ? parseInt(productIdString, 10) : 0;
    console.log(this.productId);
    //the product u opend
    this.productService.getProductById(this.productId).subscribe((data) => {
      this.product = data;
    });
    // All reviews
    this.reviewService.getAllReviews().subscribe((data) => {
      this.reviews = data;
      // the review of this product
      this.productreviews =
        this.reviews?.filter((e) => e.ProductId == this.productId) || [];
    });
    // all previous review about this product
    this.stars = this.productreviews.map((e) => e.rate);
    this.comments = this.productreviews.map((e) => e.comment);

    //randomProducts
    this. randomProducts = this.getRandomProducts(3);
    console.log(this. randomProducts);
  }

  onRatingChange(event: number) {
    this.rating = event;

    console.log('New rating:', this.rating);
  }

  addNewReview() {
    this.reviewService.addReview(this.newReview);
  }
  updateNewComment(e: any): void {
    if (e.inputType === 'insertText') {
      this.newcomment += e.data;
    } else if (e.inputType === 'deleteContentBackward') {
      this.newcomment = this.newcomment.slice(0, -1);
    }

    console.log(this.newcomment);
  }

  getRandomProducts(count: number): any[] {
    const productsCount = this.products.length;
  
    if (count >= productsCount) {
      return this.products;
    }
  
    const randomIndices: number[] = []; // Explicitly declare the type as number[]
    const randomProducts = [];
  
    while (randomIndices.length < count) {
      const randomIndex = Math.floor(Math.random() * productsCount);
  
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
        randomProducts.push(this.products[randomIndex]);
      }
    }
  
    return randomProducts;
  }
  
}
