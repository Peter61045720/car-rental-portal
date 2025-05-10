import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RentalListPage } from './rental-list.page';

describe('RentalListPage', () => {
  let component: RentalListPage;
  let fixture: ComponentFixture<RentalListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
