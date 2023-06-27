import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/_Models/customer';
import { CustomerService } from 'src/app/_services/customer.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css'],
})
export class PaymentMethodsComponent {
  userForm!: FormGroup;
  paymentMethods: string[] = [
    'Credit Card',
    
    'Cash on Delivery',
  ];
  selectedMethod: string = '';
  isEditable: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomerById(1).subscribe((data) => {
      this.customer = data;
      console.log(this.customer);
      this.intializeForm();
    });
    // Initialize the form with customer data
    console.log(this.customer);

    this.disaleAll();
  }

  intializeForm() {
    console.log(this.customer);

    this.userForm = this.formBuilder.group({
      street: [this.customer.address.street],

      city: [this.customer.address.city],
      government: [this.customer.address.government],
      phone: [this.customer.phone],
    });
  }

  saveUserAddress(): void {
    if (this.userForm.valid) {
      const street = this.userForm.get('street')?.value;
      const city = this.userForm.get('city')?.value;
      const government = this.userForm.get('government')?.value;
      const mobileNumber = this.userForm.get('phone')?.value;

      // Update the customer's address and mobile number
      this.customer.address.street = street;
      this.customer.address.city = city;
      this.customer.address.government = government;
      this.customer.phone = mobileNumber;

      console.log(this.customer);
      this.disaleAll();
      this.isEditable = false;

      this.customerService
        .updateCustomer(1, this.customer)
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
    if (this.selectedMethod === 'Credit Card') {
      this.router.navigate(['/creditCard']);
    } else {
      this.router.navigate(['/signUp']);
    }
  }
  customer: Customer = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: {
      street: '123 Main Street',
      city: 'City',
      government: 'Government',
    },
    phone: 45542555,
    password: '',
  };
}
