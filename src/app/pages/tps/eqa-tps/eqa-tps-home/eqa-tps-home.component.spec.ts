import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqaTpsHomeComponent } from './eqa-tps-home.component';

describe('EqaTpsHomeComponent', () => {
  let component: EqaTpsHomeComponent;
  let fixture: ComponentFixture<EqaTpsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqaTpsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqaTpsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
