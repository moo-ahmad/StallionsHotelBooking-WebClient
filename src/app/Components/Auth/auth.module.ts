import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { AuthInterceptorProvider } from 'src/app/Common/AppInterceptors/AuthInterceptor/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Stallions-Login'
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      title: 'Stallions-Signup'
    }
  },
  {
    path: 'unauthorized',
    component: AccessdeniedComponent,
    data: {
      title: 'Unauthorized'
    }
  }
]
@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AccessdeniedComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [AuthInterceptorProvider],
})
export class AuthModule { }
