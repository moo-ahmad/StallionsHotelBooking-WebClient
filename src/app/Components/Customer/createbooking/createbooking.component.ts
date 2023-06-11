import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateBookigRequest } from 'src/app/Models/Request/create-booking-request';

@Component({
  selector: 'app-createbooking',
  templateUrl: './createbooking.component.html',
  styleUrls: ['./createbooking.component.css']
})
export class CreatebookingComponent {
  myForm!: FormGroup;
  submitted: boolean = false;
  terms: boolean = false;
  createBookingRequest: CreateBookigRequest = {
    arrivalDate:  new Date(),
    departureDate: new Date(),
    roomType: '',
    numOfGuests: 0,
    name: '',
    email: '',
    phoneNumber: '',
    specialRequests: '',
    paymentInfo: '',
    termsAndConditions: this.terms
  }

  constructor(private fb: FormBuilder){
    this.createForm();
  }

  ngOnInit(): void {
    // Initialize any required logic here
  }

  get f() { return this.myForm.controls; }

  createForm() {
    this.myForm = this.fb.group({
      arrivalDatePicker: ['', Validators.required ],
      departureDatePicker: ['', Validators.required ],
      roomType: ['', Validators.required ],
      numOfGuests: ['', Validators.required ],
      name: ['', Validators.required ],
      email: ['', Validators.required ],
      phoneNumber: ['', Validators.required ],
      paymentInfo: ['', Validators.required ],
      specialRequests: new FormControl(),
      termsAndConditions: new FormControl()
    }
    );
  }

  changeTCFlag() {
    this.terms = !this.terms;
  }

  onSubmit(): void {
    this.submitted = true;
    if(this.myForm.invalid){
      Object.keys(this.myForm.controls).forEach(field => {
        const control = this.myForm.get(field);
        control!.markAsTouched({ onlySelf: true });
       });
      }
    // Perform form submission logic here
  }

}
