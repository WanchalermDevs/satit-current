import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationSystemHomeComponent } from './evaluation-system-home.component';

describe('EvaluationSystemHomeComponent', () => {
  let component: EvaluationSystemHomeComponent;
  let fixture: ComponentFixture<EvaluationSystemHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationSystemHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationSystemHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
