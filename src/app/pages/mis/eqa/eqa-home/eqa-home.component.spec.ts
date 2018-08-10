import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqaHomeComponent } from './eqa-home.component';

describe('EqaHomeComponent', () => {
  let component: EqaHomeComponent;
  let fixture: ComponentFixture<EqaHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqaHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
