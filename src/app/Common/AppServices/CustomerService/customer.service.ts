import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  _newBookingToastr: boolean = false;
  constructor() { }
}
