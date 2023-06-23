import { formatDate } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  Inject,
  LOCALE_ID }
  from '@angular/core';
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
    private creditCard:CreditCardService,
    @Inject(LOCALE_ID) public locale: string) {}
  date = new FormControl(moment());
  creditCardForm!: FormGroup;
  credit:creditCard={
    Id:0,
    CustomerId:0,
    ExpirationDate:new Date('2023/06'),
    Cardholder_name:''
  }
  selectedDate=new Date('2023/06')
   month=formatDate(this.selectedDate,'MM-YYYY',this.locale)

  ngOnInit(): void {
    this.buildForm();
  }
  newdate(e:any){
    console.log(e)
      this.selectedDate=e.value
  }

  buildForm(): void {
    this.creditCardForm = this.formBuilder.group({
      id: ['', Validators.required],
      expirationDate: [this.month, Validators.required],
      username: ['', Validators.required]
  
    });
  }

  submitCreditCardForm(): void {
    console.log(this.creditCardForm.value);

    if (this.creditCardForm.valid) {
      // Process the form data and submit
      this.creditCard.addcreditCard(this.creditCardForm.value).subscribe(data=>{
        console.log(data)
      })
      console.log(this.creditCardForm.value);
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
    datepicker.close();
  }
}
