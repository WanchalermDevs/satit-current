import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewCongregationComponent } from './create-new-congregation.component';

describe('CreateNewCongregationComponent', () => {
  let component: CreateNewCongregationComponent;
  let fixture: ComponentFixture<CreateNewCongregationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewCongregationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewCongregationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
