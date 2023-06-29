import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/_Models/Address';
import { Customer } from 'src/app/_Models/customer';
import { CustomerAccountService } from '../customer-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
registrationForm!: FormGroup;
submitted = false; 
customer!:Customer


constructor(private formBuilder: FormBuilder, private http: HttpClient,private customerService:CustomerAccountService,private router:Router) {}

ngOnInit() {
  this.registrationForm = this.formBuilder.group({
    name: ['', [Validators.required,Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
    phone: ['',[ Validators.required,Validators.pattern('^(015|012|011|010)[0-9]{8}$')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    street: ['', Validators.required],
    city: ['', Validators.required],
    government: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });
}

get nameControl() {
  return this.registrationForm.get('name');
}

get phoneControl() {
  return this.registrationForm.get('phone');
}

get emailControl() {
  return this.registrationForm.get('email');
}

get passwordControl() {
  return this.registrationForm.get('password');
}

get streetControl() {
  return this.registrationForm.get('street');
}

get cityControl() {
  return this.registrationForm.get('city');
}

get governmentControl() {
  return this.registrationForm.get('government');
}

get confirmPasswordControl() {
  return this.registrationForm.get('confirmPassword');
}

onSubmit() {
  this.submitted = true; // Set submitted to true
  if (this.registrationForm.valid) {
    const formData = this.registrationForm.value;
    const address: Address = {
      street: formData.street,
      city: formData.city,
      government: formData.government
    }

    this.customerService.register(this.registrationForm.value).subscribe(
      {
        next:user=>this.router.navigateByUrl("/")
      })
  
      console.log(this.customer);
    // Make an HTTP POST request to the backend API endpoint
    // this.http.post('/api/customers', this.customer)
    //   .subscribe(
    //     (response) => {
    //       // Handle the successful response from the backend
    //       console.log('Customer data saved successfully:', response);
    //     },
    //     (error) => {
    //       // Handle any errors that occur during the HTTP request
    //       console.error('Error occurred while saving customer data:', error);
    //     }
    //   );
  }
}

}
