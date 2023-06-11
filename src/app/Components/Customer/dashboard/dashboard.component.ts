import { AfterViewInit, Component } from '@angular/core';
import { ToastrService } from '@servoy/ngx-toastr';
import { CustomerService } from 'src/app/Common/AppServices/CustomerService/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  constructor( private customerService: CustomerService, private toastr: ToastrService,){}
  ngAfterViewInit(): void {
    setTimeout(() => {
      if(this.customerService._newBookingToastr) {
        this.toastr.success('Your booking has been created successfully!', ' Success!');
      }
      this.customerService._newBookingToastr = false;
    }, 1000);
  }
}
