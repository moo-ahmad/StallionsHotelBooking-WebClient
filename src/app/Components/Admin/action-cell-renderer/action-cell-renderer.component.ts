import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-action-cell-renderer',
  templateUrl: './action-cell-renderer.component.html',
  styleUrls: ['./action-cell-renderer.component.css']
})
export class ActionCellRendererComponent {
  constructor(private router: Router){}
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  onAcceptClick(): void {
    // Handle edit button click
    this.router.navigate(['../../Admin/acceptbooking'], { queryParams: { id: this.params.data.bookingId } });
  }

  onRejectClick(): void {
    // Handle delete button click
    console.log('Delete clicked for row', this.params.data);
  }
}
