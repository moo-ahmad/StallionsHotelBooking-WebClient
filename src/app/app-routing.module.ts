import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Common/AppGuards/AuthGuard/auth.guard';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AppComponent
  },
  {
    path: 'Auth',
    loadChildren: () => import('./Components/Auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
