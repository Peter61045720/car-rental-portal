import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RentalDetailsPage } from './rental-details.page';

describe('RentalDetailsPage', () => {
  let component: RentalDetailsPage;
  let fixture: ComponentFixture<RentalDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
