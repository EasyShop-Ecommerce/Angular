import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{Customer} from '../../_Models/customer'
import { Address } from 'src/app/_Models/Address';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit  {
//   registrationForm!: FormGroup;
//   submitted = false; // Track form submission

//   constructor(private formBuilder: FormBuilder,private http: HttpClient) {}

//   ngOnInit() {
//     this.registrationForm = this.formBuilder.group({
//       name: ['', Validators.required],
//       phone: ['', Validators.required],
//       Email:['', Validators.required],
//     });
//   }

//   get nameControl() {
//     return this.registrationForm.get('name');
//   }

//   get ageControl() {
//     return this.registrationForm.get('age');
//   }

 



//   onSubmit() {
//     if (this.registrationForm.valid) {
//       const formData = this.registrationForm.value;

//       // Make an HTTP POST request to the backend API endpoint
//       this.http.post('/api/customers', formData)
//         .subscribe(
//           (response) => {
//             // Handle the successful response from the backend
//             console.log('Customer data saved successfully:', response);
//           },
//           (error) => {
//             // Handle any errors that occur during the HTTP request
//             console.error('Error occurred while saving customer data:', error);
//           }
//         );
//     }
//   }

//   onCancel() {
//     // Add your cancel logic here
//   }
 
registrationForm!: FormGroup;
submitted = false; // Track form submission

constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

ngOnInit() {
  this.registrationForm = this.formBuilder.group({
    name: ['', [Validators.required,Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
    phone: ['',[ Validators.required,Validators.pattern('^(015|012|011|010)[0-9]{8}$')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    street: ['', Validators.required],
    city: ['', Validators.required],
    government: ['', Validators.required]
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

onSubmit() {
  this.submitted = true; // Set submitted to true
  if (this.registrationForm.valid) {
    const formData = this.registrationForm.value;
    const address: Address = {
      street: formData.street,
      city: formData.city,
      government: formData.government
    };
    const customer: Customer = new Customer(
     0,
      formData.name,
      formData.phone,
      formData.email,
      formData.password,
      address
    );
      console.log(customer);
    // Make an HTTP POST request to the backend API endpoint
    this.http.post('/api/customers', customer)
      .subscribe(
        (response) => {
          // Handle the successful response from the backend
          console.log('Customer data saved successfully:', response);
        },
        (error) => {
          // Handle any errors that occur during the HTTP request
          console.error('Error occurred while saving customer data:', error);
        }
      );
  }
}

onCancel() {
  // Add your cancel logic here
}
 }
