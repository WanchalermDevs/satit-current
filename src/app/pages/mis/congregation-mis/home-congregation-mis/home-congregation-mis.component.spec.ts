import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCongregationMisComponent } from './home-congregation-mis.component';

describe('HomeCongregationMisComponent', () => {
  let component: HomeCongregationMisComponent;
  let fixture: ComponentFixture<HomeCongregationMisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCongregationMisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCongregationMisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
