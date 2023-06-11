import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/Models/Request/login-request';
import { SignupRequest } from 'src/app/Models/Request/signup-request';
import { TokenResponse } from 'src/app/Models/Response/token-response';
import { environment } from 'src/environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _accountCreatedToastr: boolean = false;
  constructor(private httpClient: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<TokenResponse>{
    return this.httpClient.post<TokenResponse>(`${environment.apiUrl}/Auth/login`, loginRequest);
  }

  signup(signupRequest: SignupRequest): Observable<TokenResponse>{
    return this.httpClient.post<TokenResponse>(`${environment.apiUrl}/Auth/register`, signupRequest);
  }
}
