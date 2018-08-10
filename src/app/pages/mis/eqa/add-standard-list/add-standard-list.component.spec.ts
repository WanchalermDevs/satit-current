import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStandardListComponent } from './add-standard-list.component';

describe('AddStandardListComponent', () => {
  let component: AddStandardListComponent;
  let fixture: ComponentFixture<AddStandardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStandardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStandardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
