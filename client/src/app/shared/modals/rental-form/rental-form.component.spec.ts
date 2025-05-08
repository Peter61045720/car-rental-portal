import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RentalFormComponent } from './rental-form.component';

describe('RentalFormComponent', () => {
  let component: RentalFormComponent;
  let fixture: ComponentFixture<RentalFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RentalFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RentalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
