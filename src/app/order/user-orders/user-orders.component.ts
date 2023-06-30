import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/_Models/order';
import { Product } from 'src/app/_Models/product';
import { OrderService } from 'src/app/_services/order.service';
import { ProductService } from 'src/app/_services/product.service';
import { CustomerAccountService } from 'src/app/customer-account/customer-account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent {
  orders: Order[] = [];
  userOrders: Order[] = [];
  customerId: number;
  statusName: string;
  canCancell: boolean = false;
  product: Product[];

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private authService: CustomerAccountService
  ) {}

  ngOnInit(): void {
    // Fetch user orders from the service

    // this.route.params.subscribe((params) => {
    //   this.customerId = +params['id']; // Convert the route parameter to a number
    //   console.log(this.customerId);
    // });
    this.customerId = this.authService.GetCurrentCustomer();
    this.orderService.getAllOrders().subscribe((data) => {
      this.orders = data;
      console.log(this.orders);

      this.userOrders = this.orders.filter(
        (e) => e.customerId == this.customerId
      );
      console.log(this.userOrders);
    });
    this.productService.getAllProducts().subscribe((data) => {
      this.product = data;
    });
  }

  getStatusName(statusId: number): string {
    switch (statusId) {
      case 1:
        return 'In Progress';
      case 2:
        return 'In Transit';
      case 3:
        return 'Shipped';
      default:
        return '';
    }
  }

  getIconClass(statusId: number): string {
    switch (statusId) {
      case 1:
        return 'fa fa-hourglass-half';
      case 2:
        return 'fa fa-truck';
      case 3:
        return 'fa fa-check-circle';
      default:
        return '';
    }
  }

  getProgressBarWidth(statusId: number): string {
    switch (statusId) {
      case 1:
        return '33%';
      case 2:
        return '66%';
      case 3:
        return '100%';
      default:
        return '0%';
    }
  }

  getStatusClass(statusId: number): string {
    switch (statusId) {
      case 1:
        return 'inprogress';
      case 2:
        return 'intrasit';
      case 3:
        return 'shipped';
      default:
        return '';
    }
  }
  cancel(order: Order) {
    if (order.statusId == 1) {
      Swal.fire({
        icon: 'success',
        title: 'Alert',
        text: 'the order Cancelled',
        confirmButtonText: 'Okay',
      });
      order.canCancell = true;
      order.statusId = 4;
      this.orderService.updateOrder(order.id, order).subscribe((data) => {
        console.log(data);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Alert',
        text: 'you Can not cancell the order now call the Customer Service',
        confirmButtonText: 'Okay',
      });
    }
  }
}
