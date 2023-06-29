import { Component, OnInit } from '@angular/core';
import { cart } from 'src/app/_Models/cart';
import { Product } from 'src/app/_Models/product';
import { OrderService } from 'src/app/_services/order.service';
import { ShipperService } from 'src/app/_services/shipper.service';
import { Order } from '../../_Models/order';

@Component({
  selector: 'app-submit-order',
  templateUrl: './submit-order.component.html',
  styleUrls: ['./submit-order.component.css'],
})
export class SubmitOrderComponent {
  product!: Product;
  showproduct!: any;
  cartItems: any;
  date!: any;
  existingProduct: cart;
  totalPrice!: number;
  shipPrice!: number;
  currentProductId!: number;
  sellerId!: number;
  unitPrice!: number;
  Quantity!: number;
  neworder: Order;

  constructor(
    private shipperService: ShipperService,
    private orderservice: OrderService
  ) {}

  ngOnInit(): void {
    const productData = localStorage.getItem('selectedProduct');
    const shipDate = localStorage.getItem('Shipdate');
    const productId = localStorage.getItem('productId');
    console.log(shipDate);
    if (productData) {
      this.product = JSON.parse(productData);
    }
    if (shipDate) {
      this.date = JSON.parse(shipDate);
      console.log(this.date);
    }

    if (productId) {
      this.currentProductId = JSON.parse(productId);
      console.log(this.currentProductId);
    }

    const cartItemsString = localStorage.getItem('cartItems');
    if (cartItemsString) {
      this.cartItems = JSON.parse(cartItemsString);
    }

    this.existingProduct = this.cartItems.find(
      (item) => item.productId === this.currentProductId
    );
    if (this.existingProduct != null) {
      this.showproduct = this.existingProduct;
      this.shipperService;
    } else {
      this.showproduct = this.product;
      this.showproduct.Quantity = 1;
    }

    console.log(this.existingProduct);
    this.totalPrice = this.showproduct.price * this.showproduct.Quantity;
    this.sellerId = this.showproduct.sellerId;
    this.unitPrice = this.showproduct.price;
    this.Quantity = this.showproduct.Quantity;
    this.intialise();
  }

  prodductId: number;
  intialise() {
    this.shipperService
      .getShipperById(this.showproduct.shipperId)
      .subscribe((data) => {
        this.shipPrice = data.pricePerKm;

        // Sample date string
        const dateObject = new Date(this.date); // Convert string to Date object

        console.log(dateObject); // Output: Sun Jun 18 2023 00:00:00 GMT+0000 (Coordinated Universal Time)

        this.neworder = {
          productId: this.currentProductId,
          totalPrice: this.totalPrice,
          sellerId: this.sellerId,
          date: dateObject,
          customerId: 1,
          statusId: 1,
          shipPrice: this.shipPrice,
          unitPrice: this.unitPrice,
          quantity: this.Quantity,
          paymentMethodId: 1,
        };
      });
  }

  submitOrder() {
    console.log(this.neworder);
    this.orderservice.addOrder(this.neworder).subscribe((data) => {
      console.log(data);
    });
  }
}
