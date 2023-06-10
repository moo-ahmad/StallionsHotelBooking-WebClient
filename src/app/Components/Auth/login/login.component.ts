import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/Common/AppServices/AuthService/auth.service';
import { TokenService } from 'src/app/Common/AppServices/TokenService/token.service';
import { LoginRequest } from 'src/app/Models/Request/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequest: LoginRequest = {
    email: "",
    password: ""
  }
  myForm!: FormGroup;
  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  snackbarOpen: boolean = false;
  constructor(private messageService: MessageService,private ngxLoader: NgxUiLoaderService, private authService: AuthService, private tokenService: TokenService, private router: Router, private fb: FormBuilder){
    this.createForm();
  }

  ngOnInit(): void {
    let isLoggedIn = this.tokenService.isLoggedIn();
    if(isLoggedIn){
      this.isLoggedIn = true;
      this.router.navigate(['Patient/patientList']);
    }
  }

  get f() { return this.myForm.controls; }
  
  createForm() {
    this.myForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required ]
    },
    {
      validator: [this.validateEmail('email')]
    },
    );
  }

  validateEmail(controlName: string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      var error = control.errors;
      if (!error?.['required']) {
        if (!control.value.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
          control.setErrors({ email: true });
        } else {
          control.setErrors(null);
        }
      }
    };
  }

  onSubmit():void {
    this.submitted = true;
    if(this.myForm.invalid){
      Object.keys(this.myForm.controls).forEach(field => {
        const control = this.myForm.get(field);
        control!.markAsTouched({ onlySelf: true });
       });
    } else {
      this.ngxLoader.start();
      this.loading = true;
    this.authService.login(this.loginRequest).subscribe({
      next: (data=>{
        this.tokenService.saveSession(data);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.ngxLoader.stop();
        this.router.navigate(['Patient/patientList']);
      }),
      error: (error => {
        this.ngxLoader.stop();
        if(error.status == 401){
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Invalid Email or Password.'});  
        } else if(error.status == 0) {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Internal Server Error.'});      
        }
      })
    });
  }
  }

}
