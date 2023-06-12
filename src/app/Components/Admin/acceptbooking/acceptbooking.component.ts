import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-acceptbooking',
  templateUrl: './acceptbooking.component.html',
  styleUrls: ['./acceptbooking.component.css']
})
export class AcceptbookingComponent {
  constructor(private route: ActivatedRoute) {}
  bookingId: string = '';
  ngOnInit(): void {
    this.bookingId = this.route.snapshot.queryParams['id'];
  }

  getRooms(){
    
  }
}
