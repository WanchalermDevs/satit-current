import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongregationInfoComponent } from './congregation-info.component';

describe('CongregationInfoComponent', () => {
  let component: CongregationInfoComponent;
  let fixture: ComponentFixture<CongregationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongregationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongregationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
