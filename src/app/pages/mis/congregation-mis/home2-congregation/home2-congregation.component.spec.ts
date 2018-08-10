import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Home2CongregationComponent } from './home2-congregation.component';

describe('Home2CongregationComponent', () => {
  let component: Home2CongregationComponent;
  let fixture: ComponentFixture<Home2CongregationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Home2CongregationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Home2CongregationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
