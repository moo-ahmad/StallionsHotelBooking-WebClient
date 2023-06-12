import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptbookingComponent } from './acceptbooking.component';

describe('AcceptbookingComponent', () => {
  let component: AcceptbookingComponent;
  let fixture: ComponentFixture<AcceptbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptbookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
