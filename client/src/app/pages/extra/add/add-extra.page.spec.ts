import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddExtraPage } from './add-extra.page';

describe('AddExtraPage', () => {
  let component: AddExtraPage;
  let fixture: ComponentFixture<AddExtraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExtraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
