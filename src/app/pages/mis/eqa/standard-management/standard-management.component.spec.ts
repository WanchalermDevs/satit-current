import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardManagementComponent } from './standard-management.component';

describe('StandardManagementComponent', () => {
  let component: StandardManagementComponent;
  let fixture: ComponentFixture<StandardManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
