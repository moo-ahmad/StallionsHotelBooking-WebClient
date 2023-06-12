import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgGridModule } from 'ag-grid-angular';
import { ActionCellRendererComponent } from './action-cell-renderer/action-cell-renderer.component';
import { MatButtonModule } from '@angular/material/button';
import { AcceptbookingComponent } from './acceptbooking/acceptbooking.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Admin Dashboard '
    }
  },
  {
    path: 'acceptbooking',
    component: AcceptbookingComponent
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    ActionCellRendererComponent,
    AcceptbookingComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    AgGridModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminModule { }
