import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../_Models/product';
import { cart } from '../_Models/cart';
import { ProductSellersService } from './ProductSellers.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemCount = new BehaviorSubject<number>(0);
  public cartItemCount$ = this.cartItemCount.asObservable();
  private cartItemsUpdated = new Subject<void>();
  public cartItemsUpdated$ = this.cartItemsUpdated.asObservable();
  cartItems: cart[] = [];
  cart: cart = {
    productId: 0,
    productName: '',
    price: 0,
    Quantity: 1,
    Image: '',
  };

  constructor(private productSeller: ProductSellersService) {
    const cartItemsString = localStorage.getItem('cartItems');
    if (cartItemsString) {
      this.cartItems = JSON.parse(cartItemsString);
      this.cartItemCount.next(this.cartItems.length);
    }
  }

  getCartItemCount(): number {
    return this.cartItemCount.value;
  }

  addToCart(product: Product): void {
    this.cartItemCount.next(this.cartItemCount.value + 1);

    // Save the product details in a cookie with an expiration of 2 weeks
    const cartItemsString = localStorage.getItem('cartItems');
    // let cartItems = [];
    if (cartItemsString) {
      this.cartItems = JSON.parse(cartItemsString);
    }

    //this.productSeller.getProductSellerById()
    this.cart.productId = product.id;
    (this.cart.productName = product.title),
      //(this.cart.price = product.price);
     // (this.cart.Image = product.defaultImage);

    // Add the new product to the cart items
    this.cartItems.push(this.cart);

    // Save the updated cart items back to Local Storage
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

    console.log(this.cartItems);
  }

  removeFromCart(item: cart): void {
    const index = this.cartItems.findIndex(
      (cartItem) => cartItem.productId === item.productId
    );

    if (index !== -1) {
      this.cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.cartItemCount.next(this.cartItems.length);
      this.cartItemsUpdated.next(); // Emit event to notify subscribers that cart items have been updated
    }
  }
}
