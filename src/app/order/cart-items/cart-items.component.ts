import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductSellers } from 'src/app/_Models/ProductSellers';
import { cart } from 'src/app/_Models/cart';
import { ProductSellersService } from 'src/app/_services/ProductSellers.service';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css'],
})
export class CartItemsComponent {
  cartItemCount: number = 0;
  cartItem: any;
  constructor(
    private cartService: CartService,
    private productSellerService: ProductSellersService,
    private route: Router
  ) {}
  quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  cartItems: cart[] = [];
  prices: ProductSellers[] = [];
  loggedCustomerId: number;

  ngOnInit(): void {
    this.cartItemCount = this.cartService.getCartItemCount();

    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
    });

    this.cartItems = this.cartService.cartItems; // Retrieve the cart items directly from CartService
    console.log(this.cartItems);
  }

  updateCartItem(cart: cart): void {
    const index = this.cartItems.findIndex(
      (cartItem: any) => cartItem.productId === cart.productId
    );
    const element = this.cartItems?.find(
      (e: any) => e.productId === cart.productId
    );

    if (element) {
      element.Quantity = cart.Quantity; // Update the quantity
      // Save the updated cart items in local storage
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.cartItemCount = this.cartItems.length;
    }

    console.log(
      `Updated quantity for product ${cart.productName}: ${cart.Quantity}`
    );
  }

  removeFromCart(cart: any) {
    this.cartService.removeFromCart(cart);
  }

  BuyNow(productId: number) {
    if (localStorage.getItem('customerId')) {
      console.log(localStorage.getItem('customerId'));
      this.loggedCustomerId = JSON.parse(localStorage.getItem('customerId'));
      console.log(this.loggedCustomerId);
      console.log(productId);
      this.route.navigate(['/paymentMethod/' + productId]);
    } else {
      this.route.navigate(['CustomerAccount/login']);
    }
  }

  // buyNow(product: Product) {
  //   console.log(this.estimatedDeliveryDate);
  //   localStorage.setItem('selectedProduct', JSON.stringify(product));
  //   localStorage.setItem(
  //     'Shipdate',
  //     JSON.stringify(this.estimatedDeliveryDate)
  //   );
  //   const selectedProduct = localStorage.getItem('selectedProduct');
  //   if (selectedProduct) {
  //     const date = JSON.parse(selectedProduct);
  //     console.log(date);
  //   }
  // }
}
