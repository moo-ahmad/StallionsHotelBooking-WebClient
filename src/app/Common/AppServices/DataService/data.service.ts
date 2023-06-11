import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SignupRequest } from 'src/app/Models/Request/signup-request';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  signupRequest: SignupRequest = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    roleId: '',
    password: '',
    confirmPassword: '',
  };
  private signupFormdata = new BehaviorSubject(this.signupRequest);
  signupData = this.signupFormdata.asObservable();
  constructor(private httpClient: HttpClient) { }
  updateSignupFormData(signupRequest: SignupRequest){
    this.signupFormdata.next(signupRequest);
  }
}
