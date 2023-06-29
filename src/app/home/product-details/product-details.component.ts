import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSellers } from 'src/app/_Models/ProductSellers';
import { Review } from 'src/app/_Models/Review';
import { Customer } from 'src/app/_Models/customer';
import { Product } from 'src/app/_Models/product';
import { ProductSellersService } from 'src/app/_services/ProductSellers.service';
import { CartService } from 'src/app/_services/cart.service';
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
  prices: ProductSellers[] = [];

  product: Product = {
    title: 'Product Name',
    description: 'Product description',
    operatingSystem: '',
    id: 0,
    specialFeatures: '',
    brandName: '',
    subCategoryId: 1,
    shipperId: 1,
    hardDiskSize: '',
    material: '',
    memoryStorageCapacity: '',
    defaultImage: null,
  };

  newReview!: Review;
  editedReview!: Review;
  defaultImage: string;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private reviewService: ReviewService,
    private customerService: CustomerService,
    private cartService: CartService,
    private productSellerService: ProductSellersService,
    private router: Router
  ) {}

  ngOnInit() {
    //the id product u opend
    // const productIdString = this.route.snapshot.paramMap.get('id');
    // this.productId = productIdString ? parseInt(productIdString, 10) : 0;
    // console.log(this.productId);

    this.route.params.subscribe((params) => {
      this.productId = +params['id']; // Convert the route parameter to a number
      console.log(this.productId);

      //the product u opend
      this.productService.getProductById(this.productId).subscribe((data) => {
        this.product = data;
        console.log(this.product.defaultImage);
        this.defaultImage = 'data:image/jpeg;base64,' + data.defaultImage;
      });
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

      //names of customers who made review
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

      this.productSellerService.getAllProductSeller().subscribe((data) => {
        this.prices = data;
      });

      //randomProducts
      this.randomProducts = this.getRandomProducts(3);
      console.log(this.randomProducts);
    });

    this.productreviews = this.productreviews.map((review) => ({
      ...review,
      isEditable: false,
    }));
  }

  ///rate value
  onRatingChange(event: number) {
    this.rating = event;
    console.log('New rating:', this.rating);
  }

  enableEdit(review: Review): void {
    this.editedReview = { ...review }; // Create a copy of the review
    review.isEditable = true;
  }

  saveReview(review: Review): void {
    review.isEditable = false;
    console.log(review);
    this.editedReview.isEditable = false;
    console.log(this.editedReview);

    this.reviewService.updateReview(this.productId, 1, review).subscribe(
      () => {
        console.log('Review saved successfully');
        review.rate = this.editedReview.rate;
        review.comment = this.editedReview.comment;
      },
      (error) => {
        console.log('Error saving review:', error);
      }
    );
  }
  //comment value
  updateNewComment(e: any): void {
    if (e.inputType === 'insertText') {
      this.newcomment += e.data;
    } else if (e.inputType === 'deleteContentBackward') {
      this.newcomment = this.newcomment.slice(0, -1);
    }

    console.log(this.newcomment);
  }
  addNewReview() {
    this.newReview = {
      productId: this.productId,
      customerId: 2,
      rate: this.rating,
      comment: this.newcomment,
    };
    console.log(this.newReview);
    this.reviewService.addReview(this.newReview).subscribe((data) => {
      console.log(data);

      this.productreviews.push(data);
      // Reset the newcomment and rating values
      this.newcomment = '';
      this.rating = 5;
    });
  }

  getRandomProducts(count: number): any[] {
    const productsCount = this.products.length;
    console.log(productsCount);

    if (count >= productsCount) {
      return this.products;
    }

    const randomIndices: number[] = [];
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

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  deleteReview(reviewId: number) {
    this.reviewService.deleteReviewById(this.productId, 1).subscribe(
      () => {
        console.log('Review deleted successfully');
        // Remove the deleted review from the productreviews array
        this.productreviews = this.productreviews.filter(
          (review) =>
            !(review.productId === this.productId && review.customerId === 1)
        );
      },
      (error) => {
        console.log('Error deleting review:', error);
      }
    );
  }

  goToProductDetails(productId: number): void {
    this.router.navigate(['/productDetails', productId]);
  }
}
