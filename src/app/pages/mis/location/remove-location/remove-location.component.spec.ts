import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveLocationComponent } from './remove-location.component';

describe('RemoveLocationComponent', () => {
  let component: RemoveLocationComponent;
  let fixture: ComponentFixture<RemoveLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
