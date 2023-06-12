import { Component, ViewChild } from '@angular/core';
import { ToastrService } from '@servoy/ngx-toastr';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable, of } from 'rxjs';
import { AdminService } from 'src/app/Common/AppServices/AdminService/admin.service';
import { CustomerService } from 'src/app/Common/AppServices/CustomerService/customer.service';
import { TokenService } from 'src/app/Common/AppServices/TokenService/token.service';
import { GetBookingResponse } from 'src/app/Models/Response/get-bookings-response';
import { ActionCellRendererComponent } from '../action-cell-renderer/action-cell-renderer.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor( private adminService: AdminService, private toastr: ToastrService){}

   // Each Column Definition results in one Column.
   public columnDefs: ColDef[] = [
    { field: 'name'},
    { field: 'email'},
    { field: 'arrivalDate' },
    { field: 'departureDate' },
    { field: 'bookingStatus' },
    { field: 'Action', cellRenderer: ActionCellRendererComponent}
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  
  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  // Example load data from server
  onGridReady(params: GridReadyEvent) {
    this.getAllBookings();
  }

  getAllBookings(){
    var data = this.adminService.getAllBookings().subscribe({
      next: (data => {
        const bookingsObservable: Observable<GetBookingResponse[]> = of(data);
        this.rowData$ = bookingsObservable;
      }),
    })
  }
  // Example of consuming Grid Event
  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}
