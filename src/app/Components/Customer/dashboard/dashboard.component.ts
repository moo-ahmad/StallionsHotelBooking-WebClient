import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ToastrService } from '@servoy/ngx-toastr';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { CustomerService } from 'src/app/Common/AppServices/CustomerService/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  constructor( private customerService: CustomerService, private toastr: ToastrService,private http: HttpClient){}
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
      { field: 'make'},
      { field: 'model'},
      { field: 'price' }
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
      this.rowData$ = this.http
        .get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
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
