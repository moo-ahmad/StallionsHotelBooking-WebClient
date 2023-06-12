import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from '@servoy/ngx-toastr';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable, of } from 'rxjs';
import { CustomerService } from 'src/app/Common/AppServices/CustomerService/customer.service';
import { GetBookingResponse } from 'src/app/Models/Response/get-bookings-response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  constructor( private customerService: CustomerService, private toastr: ToastrService, private http: HttpClient){}
  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      if(this.customerService._newBookingToastr) {
        this.toastr.success('Your booking has been created successfully!', ' Success!');
      }
      this.customerService._newBookingToastr = false;
    }, 1000);
  }

    // Each Column Definition results in one Column.
    public columnDefs: ColDef[] = [
      { field: 'name'},
      { field: 'email'},
      { field: 'arrivalDate' },
      { field: 'departureDate' },
      { field: 'bookingStatus' }
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
      this.getUserBookings();
    }
  
    getUserBookings(){
      var data = this.customerService.getAllBookings().subscribe({
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
