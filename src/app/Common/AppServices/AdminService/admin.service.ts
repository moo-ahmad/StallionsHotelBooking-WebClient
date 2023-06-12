import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetBookingResponse } from 'src/app/Models/Response/get-bookings-response';
import { environment } from 'src/environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }
  getAllBookings(): Observable<GetBookingResponse[]> {
    return this.httpClient.get<GetBookingResponse[]>(`${environment.apiUrl}/Admin/GetAllBookings`, {})
  }
}
