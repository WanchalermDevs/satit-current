import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCongregationComponent } from './home-congregation.component';

describe('HomeCongregationComponent', () => {
  let component: HomeCongregationComponent;
  let fixture: ComponentFixture<HomeCongregationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCongregationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCongregationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
