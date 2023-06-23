import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/_Models/Review';
import { Customer } from 'src/app/_Models/customer';
import { Product } from 'src/app/_Models/product';
import { CustomerService } from 'src/app/_services/customer.service';
import { ProductService } from 'src/app/_services/product.service';
import { ReviewService } from 'src/app/_services/review.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  productId: number = 0;
  rating: number = 5;
  newcomment: string = '';
  products: Product[] = [];
  customers: number[] = [];
  allCustomers: Customer[] = [];
  customerNames: string[] = [];
  randomProducts: Product[] = [];
  reviews: Review[] = [];
  productreviews: Review[] = [];
  product: Product = {
    title: 'Product Name',
    description: 'Product description',
    price: 100,
    operatingSystem: '',
    id: 0,
    specialFeatures: '',
    brandName: '',
    subCategoryId: 1,
    sellerId: 0,
    hardDiskSize: '',
    material: '',
    memoryStorageCapacity: '',
  };
  newReview: Review = {
    productId: this.productId,
    customerId: 0,
    rate: this.rating,
    comment: this.newcomment,
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private reviewService: ReviewService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    //the id product u opend
    const productIdString = this.route.snapshot.paramMap.get('id');
    this.productId = productIdString ? parseInt(productIdString, 10) : 0;
    console.log(this.productId);
    //the product u opend
    this.productService.getProductById(this.productId).subscribe((data) => {
      this.product = data;
      console.log(this.product);
    });
    // All reviews
    this.reviewService.getAllReviews().subscribe((data) => {
      this.reviews = data;
      console.log(this.reviews);
      // the review of this product
      this.productreviews =
        this.reviews?.filter((e) => e.productId == this.productId) || [];
      console.log(this.productreviews);

      // all previous review about this product
      this.customers = this.productreviews.map((e) => e.customerId);
      console.log(this.customers);

      this.customerService.getAllCustomers().subscribe((data) => {
        this.allCustomers = data;
        console.log(this.allCustomers);

        this.customerNames = this.customers.map((customerId) => {
          const customer = this.allCustomers.find((c) => c.id === customerId);
          return customer ? customer.name : ''; // Use empty string if customer not found
        });
        console.log(this.customerNames);
      });
    });
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;

      //randomProducts
      this.randomProducts = this.getRandomProducts(3);
      console.log(this.randomProducts);
    });
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
    console.log(productsCount);

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
