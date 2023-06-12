import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from '@servoy/ngx-toastr';
import { CustomerService } from 'src/app/Common/AppServices/CustomerService/customer.service';
import { TokenService } from 'src/app/Common/AppServices/TokenService/token.service';
import { CreateBookigRequest } from 'src/app/Models/Request/create-booking-request';

@Component({
  selector: 'app-createbooking',
  templateUrl: './createbooking.component.html',
  styleUrls: ['./createbooking.component.css']
})
export class CreatebookingComponent implements OnInit {
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

  constructor(private fb: FormBuilder, private toastr: ToastrService, private customerService: CustomerService, private router: Router){
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
   
      this.customerService.createBooking(this.createBookingRequest).subscribe({
        next: (data => {
          if(data.result){
            this.customerService._newBookingToastr = true;
             this.router.navigate(['Customer/dashboard']);
          }
        }),
        error: (error => {
          if(error.status == 0) {
            this.toastr.error('Internal Server Error!', ' Error!');    
           }
        })
      });
  }

}
