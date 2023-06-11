import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from '@servoy/ngx-toastr';
import { AuthService } from 'src/app/Common/AppServices/AuthService/auth.service';
import { DataService } from 'src/app/Common/AppServices/DataService/data.service';
import { TokenService } from 'src/app/Common/AppServices/TokenService/token.service';
import { SignupRequest } from 'src/app/Models/Request/signup-request';

interface RoleSelect {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupRequest: SignupRequest = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    roleId: '',
    password: '',
    confirmPassword: '',
  };
  myForm!: FormGroup;
  loading = false;
  submitted = false;
  isLoggedIn = false;
  isLoginFailed = false;

  roles: RoleSelect[] = [
    { value: '19CA1E06-2123-489D-96F6-5F1652589159', viewValue: 'Admin' },
    { value: 'BA53E28E-C688-43C5-ABCC-8C44C1B0B234', viewValue: 'Customer' },
  ];

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private data: DataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    let isLoggedIn = this.tokenService.isLoggedIn();
    if (isLoggedIn) {
      this.isLoggedIn = true;
      this.router.navigate(['patient']);
    }
    this.myForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        email: ['', [Validators.required]],
        roleSelect: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: [
          this.MustMatch('password', 'confirmPassword'),
          this.validatePassword('password'),
          this.validateEmail('email'),
        ],
      }
    );
    this.data.updateSignupFormData(this.signupRequest);
  }
  get f() {
    return this.myForm.controls;
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['MustMatch']) {
      }
      if (control.value != matchingControl.value) {
        if (matchingControl.value != '') {
          matchingControl.setErrors({ notSame: true });
        }
      } else {
        if (matchingControl.value == '') {
          control.setErrors({ required: true });
        }
      }
    };
  }

  validateEmail(controlName: string) {
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

  validatePassword(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      var error = control.errors;
      if (!error?.['required']) {
        if (
          !control.value.match(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
          )
        ) {
          control.setErrors({ invalidPass: true });
        } else {
          control.setErrors(null);
        }
      }
    };
  }

  validateConfirmPassword(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      var error = control.errors;
      if (!error?.['required']) {
        if (
          !control.value.match(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
          )
        ) {
          control.setErrors({ invalidPass: true });
        } else {
          control.setErrors(null);
        }
      }
    };
  }

  onSubmit() {
    this.submitted = true;
    if (this.myForm.invalid) {
      return;
    } else {
      this.loading = true;
      this.authService.signup(this.signupRequest).subscribe({
        next: (data) => {
          this.tokenService.saveSession(data);
          this.router.navigate(['Auth/login']);
        },
        error: (error) => {
          if (error.status == 0) {
            this.toastr.error('Internal Server Error!', ' Error!');
          }
        },
      });
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
