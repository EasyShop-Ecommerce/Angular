import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { Component, ViewEncapsulation } from '@angular/core';
import { Inject, LOCALE_ID } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { Data, Router } from '@angular/router';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { creditCard } from 'src/app/_Models/creditCard';
import { CreditCardService } from 'src/app/_services/credit-card.service';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

/** @title Datepicker emulating a Year and month picker */
@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.css'],

  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CreditcardComponent {
  constructor(
    private formBuilder: FormBuilder,
    private creditCard: CreditCardService,
    private router:Router,
    @Inject(LOCALE_ID) public locale: string
  ) {}

  creditCardForm!: FormGroup;
  selectedDate: any;
  submitted = false;
  credit: creditCard = {
    id: 0,
    customerId: 3,
    expirationDate: new Date('2025/06'),
    cardholder_name: '',
    cardNumber: '',
  };

  ngOnInit(): void {
    console.log(this.date.value?.toISOString());
    this.buildForm();
    console.log(this.date.value);
  }

  buildForm(): void {
    this.creditCardForm = this.formBuilder.group({
      cardNumber: [
        '',
        [Validators.required, Validators.pattern('^4[0-9]{12}(?:[0-9]{3})?$')],
      ],
      expirationDate: [this.date.value?.toISOString(), Validators.required],
      cardholder_name: ['', Validators.required],
      customerId: 1,
    });
    console.log(this.creditCardForm.value);
  }
  get cardNumberControl() {
    return this.creditCardForm.get('cardNumber');
  }
  get cardholder_nameControl() {
    return this.creditCardForm.get('cardholder_name');
  }
  submitCreditCardForm(): void {
    console.log(this.creditCardForm.value);

    if (this.creditCardForm.valid) {
      // Process the form data and submit
      this.submitted = true;
      this.creditCard
        .addcreditCard(this.creditCardForm.value)
        .subscribe((data) => {
          console.log(data);
        });
      Swal.fire({
        title: 'Success!',
        text: 'Data has been added successfully.',
        icon: 'success',
        showCloseButton: true,
        confirmButtonText: 'Close',
      }).then(() => {
        // Optional: Perform any additional actions after the alert is closed
        // ...
        this.creditCardForm.reset();
        this.creditCardForm.controls['cardholder_name'].clearValidators();
        this.creditCardForm.controls[
          'cardholder_name'
        ].updateValueAndValidity();
        this.creditCardForm.controls['cardNumber'].clearValidators();
        this.creditCardForm.controls[
          'cardNumber'
        ].updateValueAndValidity();
      });
      console.log(this.creditCardForm.value);
      this.router.navigate(['submitOrder/1']);

    }
  }

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    console.log(this.date.value);
    console.log(this.date.value?.format('MM-YYYY'));
    this.selectedDate = this.date.value?.format('MM-YYYY');
    datepicker.close();
  }
  date = new FormControl(moment());
}
