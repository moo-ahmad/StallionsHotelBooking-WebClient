import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { CreatebookingComponent } from './createbooking/createbooking.component';
import { AgGridModule } from 'ag-grid-angular';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Customer Dashboard'
    }
  },
  {
    path: 'createbooking',
    component: CreatebookingComponent,
    data: {
      title: 'Create Booking'
    }
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    CreatebookingComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CustomerModule { }
