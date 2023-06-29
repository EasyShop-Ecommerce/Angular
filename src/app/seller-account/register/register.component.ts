import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/_Models/Address';
import { Seller } from 'src/app/_Models/Seller';
import { SellerService } from 'src/app/_services/seller.service';
import { SellerAccountService } from 'src/app/seller-account/seller-account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

registrationForm!: FormGroup;
submitted = false; 
seller!:Seller


constructor(
  private formBuilder: FormBuilder,
  private http: HttpClient,
  private sellerService:SellerService,
  private router:Router,
  private sellerAccoutService:SellerAccountService
  ) {}

ngOnInit() {
  this.registrationForm = this.formBuilder.group({
    firstName: ['', [Validators.required,Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
    middleName: ['', [Validators.required,Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
    lastName: ['', [Validators.required,Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
    phone: ['',[ Validators.required,Validators.pattern('^(015|012|011|010)[0-9]{8}$')]],
    email: ['', [Validators.required, Validators.email]],
    sSN: ['', [Validators.required, Validators.minLength(14), Validators.pattern('^[0-9]{14}$')]],
    businessName: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    street: ['', Validators.required],
    city: ['', Validators.required],
    government: ['', Validators.required],
    confirmPassword:['', Validators.required]
  });
}

get firstNameControl() {
  return this.registrationForm.get('firstName');
}

get lastNameControl() {
  return this.registrationForm.get('lastName');
}

get middleNameControl() {
  return this.registrationForm.get('middleName');
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
get sSNControl() {
  return this.registrationForm.get('sSN');
}

get businessNameControl() {
  return this.registrationForm.get('businessName');
}

get confirmPasswordControl(){
  return this.registrationForm.get('confirmPassword');
}
onSubmit()
{
  this.sellerAccoutService.register(this.registrationForm.value).subscribe(
    {
      next:user=>this.router.navigateByUrl("/")
    })

}
}

// onSubmit() {
//   this.submitted = true; // Set submitted to true
//   //if (this.registrationForm.valid) {
//     const formData = this.registrationForm.value;
//     console.log(formData)
//     this.seller=formData
//     const address: Address = {
//       Street: formData.street,
//       City: formData.city,
//       Government: formData.government
//     };

   
  
//       console.log(this.seller);



//     // this.sellerService.addSeller(this.seller)
//     //   .subscribe(
//     //     (response) => {
//     //       // Handle the successful response from the backend
//     //       Swal.fire({
//     //         title: 'Seller Added',
//     //         text: 'The seller has been successfully added.',
//     //         icon: 'success',
//     //       });
      
//     //       // Clear input fields
//     //       this.registrationForm.reset()
       
//     //       console.log('Customer data saved successfully:', response);
//     //     },
//     //     // (error) => {
//     //     //   // Handle any errors that occur during the HTTP request
//     //     //   console.error('Error occurred while saving customer data:', error);
//     //     // }
//     //   );
//   }


