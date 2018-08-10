import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCongregationComponent } from './edit-congregation.component';

describe('EditCongregationComponent', () => {
  let component: EditCongregationComponent;
  let fixture: ComponentFixture<EditCongregationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCongregationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCongregationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
