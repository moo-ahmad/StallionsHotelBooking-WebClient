import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Common/AppGuards/AuthGuard/auth.guard';
import { AppComponent } from './app.component';
import { AdminGuard } from './Common/AppGuards/AdminGuard/admin.guard';
import { CustomerGuard } from './Common/AppGuards/CustomerGuard/customer.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AppComponent
  },
  {
    path: 'Auth',
    loadChildren: () => import('./Components/Auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'Admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./Components/Admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'Customer',
    canActivate: [],
    loadChildren: () => import('./Components/Customer/customer.module').then(m => m.CustomerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
