import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/_Models/customer';
import { CustomerService } from 'src/app/_services/customer.service';
import { PaymentMethod } from 'src/app/_Models/payment';
import { PaymentService } from 'src/app/_services/payment.service';
import { Address } from 'src/app/_Models/Address';
import { CustomerAccountService } from 'src/app/customer-account/customer-account.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css'],
})
export class PaymentMethodsComponent {
  userForm!: FormGroup;
  paymentMethods: PaymentMethod[] = [];
  selectedMethod: string = '';
  isEditable: boolean = false;
  productId: number = 0;
  loggedInCustomer: number;
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private authService: CustomerAccountService
  ) {
    this.userForm = this.formBuilder.group({
      street: [''],
      city: [''],
      government: [''],
      phone: [''],
    });
  }

  ngOnInit(): void {
    this.loggedInCustomer = this.authService.GetCurrentCustomer();
    this.route.params.subscribe((params) => {
      this.productId = +params['id']; // Convert the route parameter to a number
      console.log(this.productId);
      localStorage.setItem('productId', JSON.stringify(this.productId));
    });

    this.customerService
      .getCustomerById(this.loggedInCustomer)
      .subscribe((data) => {
        this.customer = data;
        this.userForm = this.formBuilder.group({
          street: [this.customer.street],
          city: [this.customer.city],
          government: [this.customer.government],
          phone: [this.customer.phone],
        });

        console.log(this.customer);
      });
    this.paymentService.getAllPaymentMethods().subscribe((data) => {
      this.paymentMethods = data;
      console.log(this.paymentMethods);
    });
    // Initialize the form with customer data
    console.log(this.customer);

    this.disaleAll();
  }

  intializeForm() {
    console.log(this.customer.street);
    const street = this.customer.street;

    this.userForm = this.formBuilder.group({
      street: [street],
      city: [this.customer.city],
      government: [this.customer.government],
      phone: [this.customer.phone],
    });
  }
  saveUserAddress(): void {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      const street = this.userForm.get('street')?.value;
      const city = this.userForm.get('city')?.value;
      const government = this.userForm.get('government')?.value;
      const mobileNumber = this.userForm.get('phone')?.value;

      // Update the customer's address and mobile number
      this.customer.street = street;
      this.customer.city = city;
      this.customer.government = government;
      this.customer.phone = mobileNumber;
      // this.customer.password=this.customer.password
      // this.customer.email=this.customer.email

      console.log(this.customer);
      this.disaleAll();
      this.isEditable = false;

      this.customerService
        .updateCustomer(this.loggedInCustomer, this.customer)
        .subscribe((data) => {
          console.log(data);
        });
    }
  }
  toggleEditState(): void {
    this.isEditable = !this.isEditable;
    this.userForm.get('phone')?.enable();
    this.userForm.get('government')?.enable();
    this.userForm.get('city')?.enable();
    this.userForm.get('street')?.enable();
    this.isEditable = true;
  }
  disaleAll() {
    if (this.userForm) {
      this.userForm.get('phone')?.disable();
      this.userForm.get('government')?.disable();
      this.userForm.get('city')?.disable();
      this.userForm.get('street')?.disable();
    }
  }

  submitPaymentMethod(): void {
    if (this.selectedMethod == 'credit Card') {
      this.router.navigate(['/creditCard/1']);
    } else {
      this.router.navigate(['/submitOrder/ 2']);
    }
  }
  customer: Customer = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',

    street: '123 Main Street',
    city: 'City',
    government: 'Government',

    phone: '45542555',
    password: '',
  };
}
