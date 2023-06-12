import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateBookigRequest } from 'src/app/Models/Request/create-booking-request';
import { CreateBookingResponse } from 'src/app/Models/Response/create-booking-response';
import { GetBookingResponse } from 'src/app/Models/Response/get-bookings-response';
import { environment } from 'src/environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  _newBookingToastr: boolean = false;
  constructor(private httpClient: HttpClient) { }

  createBooking(createBookingRequest: CreateBookigRequest): Observable<CreateBookingResponse> {
    return this.httpClient.post<CreateBookingResponse>(`${environment.apiUrl}/Customer/CreateBooking`, createBookingRequest)
  }
  
  getAllBookings(): Observable<GetBookingResponse[]> {
    return this.httpClient.get<GetBookingResponse[]>(`${environment.apiUrl}/Customer/GetUserBookings`, {})
  }
}
