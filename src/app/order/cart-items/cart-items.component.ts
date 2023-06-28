import { Component } from '@angular/core';
import { cart } from 'src/app/_Models/cart';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css'],
})
export class CartItemsComponent {
  cartItemCount: number = 0;
  cartItem: any;
  constructor(private cartService: CartService) {}
  quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  cartItems: cart[] = [];

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
}
