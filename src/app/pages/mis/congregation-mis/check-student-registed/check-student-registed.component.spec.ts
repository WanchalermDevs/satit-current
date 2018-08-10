import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckStudentRegistedComponent } from './check-student-registed.component';

describe('CheckStudentRegistedComponent', () => {
  let component: CheckStudentRegistedComponent;
  let fixture: ComponentFixture<CheckStudentRegistedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckStudentRegistedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckStudentRegistedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
