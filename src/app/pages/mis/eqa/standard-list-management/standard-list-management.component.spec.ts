import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardListManagementComponent } from './standard-list-management.component';

describe('StandardListManagementComponent', () => {
  let component: StandardListManagementComponent;
  let fixture: ComponentFixture<StandardListManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardListManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardListManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
