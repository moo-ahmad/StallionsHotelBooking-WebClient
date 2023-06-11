import { Component } from '@angular/core';

@Component({
  selector: 'app-createbooking',
  templateUrl: './createbooking.component.html',
  styleUrls: ['./createbooking.component.css']
})
export class CreatebookingComponent {
  arrivalDate: Date = new Date();
  departureDate: Date = new Date();
  roomType: string = '';
  numOfGuests: number = 0;
  name: string = '';
  email: string = '';
  phoneNumber: string = '';
  specialRequests: string = '';
  paymentInfo: string = '';
  termsAndConditions: boolean = false;
  
  ngOnInit(): void {
    // Initialize any required logic here
  }

  onSubmit(): void {
    // Perform form submission logic here
  }

}
